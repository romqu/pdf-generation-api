import { Floor } from "../../model/document/floor";

export class CreateImageFileNames {
  public execute(floor: Floor): void {
    floor.livingUnitList.forEach(livingUnit =>
      livingUnit.roomList.forEach(room =>
        room.defectList.forEach(defect => defect)
      )
    );
  }
}
