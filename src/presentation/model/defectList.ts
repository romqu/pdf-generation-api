// import {
//   autoserializeAs,
//   autoserializeAsArray
// } from "cerialize/src/annotations";

// import { Address } from "./address";
// import { Creator } from "./creator";
// import { Floor } from "./floor";
// import { Participant } from "./participant";

// export class DefectList {
//   @autoserializeAs(String) public readonly date: string;
//   @autoserializeAs(Creator) public readonly creator: Creator;
//   @autoserializeAs(Address) public readonly address: Address;
//   @autoserializeAsArray(Participant)
//   public readonly participantList: Participant[];
//   @autoserializeAsArray(Floor) public readonly floorList: Floor[];

//   constructor(
//     date: string,
//     creator: Creator,
//     address: Address,
//     participantList: Participant[],
//     floorList: Floor[]
//   ) {
//     this.date = date;
//     this.creator = creator;
//     this.address = address;
//     this.participantList = participantList;
//     this.floorList = floorList;
//   }
// }
