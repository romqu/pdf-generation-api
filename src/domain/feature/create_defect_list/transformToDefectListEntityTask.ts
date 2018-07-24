import { provideSingleton } from "../../../core/ioc/ioc";
import { DefectEntity } from "../../../data/defect_list/defectEntity";
import { DefectImageEntity } from "../../../data/defect_list/defectImageEntity";
import { DefectListEntity } from "../../../data/defect_list/defectListEntity";
import { FloorEntity } from "../../../data/defect_list/floorEntity";
import { LivingUnitEntity } from "../../../data/defect_list/livingUnitEntity";
import { RoomEntity } from "../../../data/defect_list/roomEntity";
import { StreetAddressEntity } from "../../../data/defect_list/streetAddressEntity";
import { ViewParticipantEntity } from "../../../data/defect_list/viewParticipantEntity";
import { DefectList } from "../../model/document/defectList";
import { Response } from "../../model/response";

@provideSingleton(TransformToDefectListEntityTask)
export class TransformToDefectListEntityTask {
  public execute(
    defectList: DefectList,
    defectListName: string,
    allDefectImagesEntityListMap: Map<number, DefectImageEntity[]>
  ): Response<DefectListEntity> {
    let counter = 0;
    let defectEntityList: DefectEntity[] = [];
    let roomEntityList: RoomEntity[] = [];
    let livingUnitEntityList: LivingUnitEntity[] = [];
    const floorEntityList: FloorEntity[] = [];

    defectList.streetAddress.floorList.forEach(floor => {
      floor.livingUnitList.forEach(livingUnit => {
        livingUnit.roomList.forEach(room => {
          room.defectList.forEach(defect => {
            defectEntityList.push(
              new DefectEntity(
                0,
                defect.description,
                defect.measure,
                defect.companyInCharge,
                defect.doneTill,
                0,
                [...allDefectImagesEntityListMap.get(counter++)!]
              )
            );
          });

          roomEntityList.push(
            new RoomEntity(
              0,
              room.name,
              room.number,
              room.locationDescription,
              0,
              [...defectEntityList]
            )
          );

          defectEntityList = [];
        });

        livingUnitEntityList.push(
          new LivingUnitEntity(0, livingUnit.number, 0, [...roomEntityList])
        );

        roomEntityList = [];
      });

      floorEntityList.push(
        new FloorEntity(0, floor.name, 0, [...livingUnitEntityList])
      );

      livingUnitEntityList = [];
    });

    const streetAddress = defectList.streetAddress;

    const viewParticipantEntityList = streetAddress.viewParticipantList.map(
      viewParticipant =>
        new ViewParticipantEntity(
          0,
          viewParticipant.forename,
          viewParticipant.surname,
          viewParticipant.phoneNumber,
          viewParticipant.email,
          viewParticipant.companyName,
          0
        )
    );

    return {
      isSuccess: true,
      data: new DefectListEntity(
        0,
        defectListName,
        defectList.creator.clientId,
        defectList.creationDate,
        new StreetAddressEntity(
          0,
          streetAddress.postalCode,
          streetAddress.name,
          streetAddress.number,
          streetAddress.additional,
          0,
          [...floorEntityList],
          [...viewParticipantEntityList]
        )
      )
    };
  }
}
