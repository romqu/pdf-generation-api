import parse = require("await-busboy");
import { Lifecycle, Request, ResponseToolkit } from "hapi";

import { container } from "../../../core/ioc/ioc";
import { CreateDefectListController } from "./createDefectListController";

const controller = container.get(CreateDefectListController);

export const createDefectListHandler = async (
  request: Request,
  _: ResponseToolkit
): Promise<Lifecycle.ReturnValue> => {
  const data = request.payload;

  const result = parse(data);

  // await controller.execute(result);

  // const docStat = await fs.stat("/home/roman/Downloads/annual_report_2009.pdf");

  // const stream = fs.createReadStream(
  //   "/home/roman/Downloads/annual_report_2009.pdf"
  // );

  // return h
  //   .response(stream)
  //   .type("application/pdf")
  //   .header("Content-type", "application/pdf")
  //   .header("Content-length", docStat.toString())
  //   .header("Content-Encoding", "none");

  return result;
};

// const imageFilter = (fileName: string): boolean => {
//   // accept image only
//   if (!fileName.match(/\.(jpg|jpeg|png)$/)) {
//     return false;
//   }

//   return true;
// };

// async function filesHandler(files: any): Promise<string[]> {
//   const promises = files.map(x => fileHandler(x));

//   return Promise.all<string>(promises);
// }

// async function fileHandler(file: any): Promise<string> {
//   if (!file) {
//     throw new Error("no file");
//   }

//   const orignalName = file.hapi.filename;

//   if (!imageFilter(orignalName)) {
//     throw new Error("file type not allowed");
//   }

//   const fileStream = fs.createWriteStream(
//     `./uploads/${generateUuidv4()}${orignalName}`
//   );

//   return new Promise<string>((resolve, reject): void => {
//     file.on("error", err => {
//       reject(err);
//     });

//     file.pipe(fileStream);

//     file.on("end", err => {
//       resolve("end");
//     });
//   });
