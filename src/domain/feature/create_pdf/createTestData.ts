import { Creator } from "../../model/document/creator";
import { Defect } from "../../model/document/defect";
import { DefectImage } from "../../model/document/defectImage";
import { DefectList } from "../../model/document/defectList";
import { Floor } from "../../model/document/floor";
import { LivingUnit } from "../../model/document/livingUnit";
import { Room } from "../../model/document/room";
import { StreetAddress } from "../../model/document/streetAddress";
import { ViewParticipant } from "../../model/document/viewParticipant";

export function createTestData(): DefectList {
  const range = (n: number): number[] =>
    Array.from({ length: n }, (_, key) => key);
  const defectImageList = range(1).map(
    _ => new DefectImage("", 0, "mangel.jpg")
  );
  const defectList = range(1).map(
    _ => new Defect("Bla", "iwqd", "AG", "1995/01/01", defectImageList)
  );
  const roomList = range(1).map(_ => new Room("wqd", 1, "wqdwqd", defectList));
  const livingUnitList = range(1).map(_ => new LivingUnit(1, roomList));
  const floorList = range(1).map(_ => new Floor("EG", livingUnitList));
  const viewParticipantList = range(1).map(
    _ => new ViewParticipant("Bern", "Me", 12345, "wqdwqd@wdwqd.de", "adsadsa")
  );

  return new DefectList(
    "list",
    "08/08/2011",
    new Creator(1),
    new StreetAddress("abcd", 1, "ab", 1234567, floorList, viewParticipantList)
  );
}
