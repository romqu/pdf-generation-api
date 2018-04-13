import "reflect-metadata";

import { inject } from "inversify";
import { IDatabase, IMain, ITask } from "pg-promise";

import { ResponsePromise } from "../../domain/model/response";
import { provide } from "../../ioc/ioc";
import { TYPES } from "../../ioc/types";
import { failableAsync } from "../../util/failableUtil";
import { IReturnedId } from "../diskDataSource";
import { DefectEntity } from "./defectEntity";
import { DefectImageEntity } from "./defectImageEntity";
import { DefectListEntity } from "./defectListEntity";
import { FloorEntity } from "./floorEntity";
import { LivingUnitEntity } from "./livingUnitEntity";
import { RoomEntity } from "./roomEntity";
import { StreetAddressEntity } from "./streetAddressEntity";
import { ViewParticipantEntity } from "./viewParticipantEntity";

@provide(CreateFullDefectListRepo)
  .inSingletonScope()
  .done()
export class CreateFullDefectListRepo {
  private readonly pgDb: IDatabase<any>;
  private readonly pgMain: IMain;

  constructor(
    @inject(TYPES.PgpDb) pgDb: IDatabase<any>,
    @inject(TYPES.PgpMain) pgMain: IMain
  ) {
    this.pgDb = pgDb;
    this.pgMain = pgMain;
  }

  public insert(entity: DefectListEntity): ResponsePromise<IReturnedId> {
    const returningId = "RETURNING id";

    return failableAsync({ type: "DB", code: 100, title: "Query Error" }, () =>
      this.pgDb.tx<IReturnedId>(async (t: ITask<IReturnedId>) => {
        // insert DefectList
        const dLRowId = await t.one<IReturnedId>(
          this.pgMain.helpers.insert(
            {
              name: entity.name,
              creation_date: entity.creationDate.toLocaleDateString(),
              client_id: entity.clientId
            },
            DefectListEntity.getColumnSet(this.pgMain)
          ) + returningId
        );

        // insert StreetAddress
        const sARowId = await t.one<IReturnedId>(
          this.pgMain.helpers.insert(
            {
              name: entity.streetAddressEntity.name,
              postal_code: entity.streetAddressEntity.postalCode,
              number: entity.streetAddressEntity.number,
              additional: entity.streetAddressEntity.additional,
              defect_list_id: dLRowId.id
            },
            StreetAddressEntity.getColumnSet(this.pgMain)
          ) + returningId
        );

        // insert ViewParticipants
        const viewParticipantValues = entity.streetAddressEntity.viewParticipantEntityList.map(
          viewParticipant => ({
            forename: viewParticipant.forename,
            surname: viewParticipant.surname,
            phone_number: viewParticipant.phoneNumber,
            e_mail: viewParticipant.email,
            company_name: viewParticipant.companyName,
            street_address_id: sARowId.id
          })
        );

        await t.none(
          this.pgMain.helpers.insert(
            viewParticipantValues,
            ViewParticipantEntity.getColumnSet(this.pgMain)
          )
        );

        // insert Floors
        const floorValues = entity.streetAddressEntity.floorEntityList.map(
          floor => ({
            name: floor.name,
            street_address_id: sARowId.id
          })
        );

        const floorInsertIdList = await t.map(
          this.pgMain.helpers.insert(
            floorValues,
            FloorEntity.getColumnSet(this.pgMain)
          ) + returningId,
          [],
          (row: IReturnedId) => row
        );

        // insert LivingUnits
        const livingUnitValues: Array<{
          number: number;
          floor_id: number;
        }> = [];

        const tempRoomEntityListList: [RoomEntity[]] = [[]];
        tempRoomEntityListList.pop();

        for (let i = 0; i < floorInsertIdList.length; i++) {
          const floorId = floorInsertIdList[i].id;

          entity.streetAddressEntity.floorEntityList[
            i
          ].livingUnitEntityList.forEach(livingUnit => {
            tempRoomEntityListList.push(livingUnit.roomEntityList);

            livingUnitValues.push({
              number: livingUnit.number,
              floor_id: floorId
            });
          });
        }

        const livingUnitInsertIdList = await t.map(
          this.pgMain.helpers.insert(
            livingUnitValues,
            LivingUnitEntity.getColumnSet(this.pgMain)
          ) + returningId,
          [],
          (row: IReturnedId) => row
        );

        // insert Rooms
        const roomEntityValues: Array<{
          name: string;
          number: number;
          location_description: string;
          living_unit_id: number;
        }> = [];

        const tempDefectEntiyListList: [DefectEntity[]] = [[]];
        tempDefectEntiyListList.pop();

        for (let i = 0; i < livingUnitInsertIdList.length; i++) {
          const livingUnitId = livingUnitInsertIdList[i].id;

          tempRoomEntityListList[i].forEach(roomEntity => {
            tempDefectEntiyListList.push(roomEntity.defectEntityList);

            roomEntityValues.push({
              name: roomEntity.name,
              number: roomEntity.number,
              location_description: roomEntity.locationDescription,
              living_unit_id: livingUnitId
            });
          });
        }

        const roomEntitytInsertIdList = await t.map(
          this.pgMain.helpers.insert(
            roomEntityValues,
            RoomEntity.getColumnSet(this.pgMain)
          ) + returningId,
          [],
          (row: IReturnedId) => row
        );

        // insert Defects
        const defectEntityValues: Array<{
          description: string;
          measure: string;
          company_in_charge: string;
          done_till: string;
          room_id: number;
        }> = [];

        const tempDefectImageEntiyListList: [DefectImageEntity[]] = [[]];

        for (let i = 0; i < roomEntitytInsertIdList.length; i++) {
          const roomEntityId = roomEntitytInsertIdList[i].id;

          tempDefectEntiyListList[i].forEach(defectEntity => {
            tempDefectImageEntiyListList.push(
              defectEntity.defectImageEntityList
            );

            defectEntityValues.push({
              description: defectEntity.description,
              measure: defectEntity.measure,
              company_in_charge: defectEntity.companyInCharge,
              done_till: defectEntity.doneTill,
              room_id: roomEntityId
            });
          });
        }

        const defectEntitytInsertIdList = await t.map(
          this.pgMain.helpers.insert(
            defectEntityValues,
            DefectEntity.getColumnSet(this.pgMain)
          ) + returningId,
          [],
          (row: IReturnedId) => row
        );

        return { id: dLRowId.id };
      })
    );
  }
}
