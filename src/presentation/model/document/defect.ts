// import {
//   autoserializeAs,
//   autoserializeAsArray
// } from "cerialize/src/annotations";

// import { Image } from "./image";

// export class Defect {
//   @autoserializeAs(String) public readonly description: string;
//   @autoserializeAs(String) public readonly personInCharge: string;
//   @autoserializeAs(String) public readonly doneTill: string;
//   @autoserializeAsArray(Image) public readonly imageList: Image[];

//   constructor(
//     description: string,
//     personInCharge: string,
//     doneTill: string,
//     imageList: Image[]
//   ) {
//     this.description = description;
//     this.personInCharge = personInCharge;
//     this.doneTill = doneTill;
//     this.imageList = imageList;
//   }
// }
