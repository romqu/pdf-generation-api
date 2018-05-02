import { Creator } from "../domain/model/document/creator";
import { Defect } from "../domain/model/document/defect";
import { DefectImage } from "../domain/model/document/defectImage";
import { DefectList } from "../domain/model/document/defectList";
import { Floor } from "../domain/model/document/floor";
import { LivingUnit } from "../domain/model/document/livingUnit";
import { Room } from "../domain/model/document/room";
import { StreetAddress } from "../domain/model/document/streetAddress";
import { ViewParticipant } from "../domain/model/document/viewParticipant";

const range = (n: number): number[] =>
  Array.from({ length: n }, (_, key) => key);

export function createTestDataFull(): DefectList {
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

export function createTestDataBasic(): DefectList {
  const viewParticipantList = range(1).map(
    _ => new ViewParticipant("Bern", "Me", 12345, "wqdwqd@wdwqd.de", "adsadsa")
  );

  return new DefectList(
    "list",
    "08/08/2011",
    new Creator(1),
    new StreetAddress("abcd", 1, "ab", 1234567, [], viewParticipantList)
  );
}
