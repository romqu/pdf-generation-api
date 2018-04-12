import "reflect-metadata";

import { inject } from "inversify";
import { IDatabase, IMain, ITask } from "pg-promise";

import { provide } from "../../ioc/ioc";
import { TYPES } from "../../ioc/types";
import { logInfo } from "../../util/loggerUtil";
import { generateUuidv4 } from "../../util/uuidv4Util";
import { IReturnedId } from "../diskDataSource";
import { DefectEntity } from "./defectEntity";
import { DefectListEntity } from "./defectListEntity";
import { FloorEntity } from "./floorEntity";
import { LivingUnitEntity } from "./livingUnitEntity";
import { RoomEntity } from "./roomEntity";
import { StreetAddressEntity } from "./streetAddressEntity";

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

  public test(entity: DefectListEntity): void {
    const returningId = "RETURNING id";

    this.pgDb.tx<IReturnedId>(async (t: ITask<IReturnedId>) => {
      const dLRowId = await t.one<IReturnedId>(
        this.pgMain.helpers.insert(
          {
            name: generateUuidv4(),
            client_id: entity.clientId
          },
          DefectListEntity.getColumnSet(this.pgMain)
        ) + returningId
      );

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
          FloorEntity.getColumnSet(this.pgMain)
        )
      );

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
        (row: IReturnedId) => +row.id
      );

      const livingUnitValues: Array<{
        number: number;
        floor_id: number;
      }> = [];

      const tempRoomEntityListList: [RoomEntity[]] = [[]];

      for (let i = 0; i < floorInsertIdList.length; i++) {
        const floorId = floorInsertIdList[i];

        for (const livingUnit of entity.streetAddressEntity.floorEntityList[i]
          .livingUnitEntityList) {
          tempRoomEntityListList.push(livingUnit.roomEntityList);

          livingUnitValues.push({
            number: livingUnit.number,
            floor_id: floorId
          });
        }
      }

      const livingUnitInsertIdList = await t.map(
        this.pgMain.helpers.insert(
          livingUnitValues,
          LivingUnitEntity.getColumnSet(this.pgMain)
        ) + returningId,
        [],
        (row: IReturnedId) => +row.id
      );

      const roomValues: Array<{
        name: string;
        number: number;
        location_description: string;
        living_unit_id: number;
      }> = [];

      const tempDefectEntiyListList: [DefectEntity[]] = [[]];

      for (let i = 0; i < livingUnitInsertIdList.length; i++) {
        const livingUnitId = livingUnitInsertIdList[i];

        tempRoomEntityListList[i].forEach(roomEntity => {
          tempDefectEntiyListList.push(roomEntity.defectEntityList);

          roomValues.push({
            name: roomEntity.name,
            number: roomEntity.number,
            location_description: roomEntity.locationDescription,
            living_unit_id: livingUnitId
          });
        });
      }

      logInfo("result", livingUnitInsertIdList);

      return { id: 1 };
    });
  }
}
