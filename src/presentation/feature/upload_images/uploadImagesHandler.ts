import parse = require("await-busboy");
import { Deserialize } from "cerialize";
import fs = require("fs");
import { Lifecycle, Request, ResponseToolkit } from "hapi";

import { CreateDefectListManager } from "../../../domain/feature/create_defect_list/createDefectListManager";
import { DefectList } from "../../../domain/model/document/defectList";
import { container } from "../../../ioc/ioc";
import { logInfo } from "../../../util/loggerUtil";

const imageFilter = (fileName: string): boolean => {
  // accept image only
  if (!fileName.match(/\.(jpg|jpeg|png)$/)) {
    return false;
  }

  return true;
};

const manager = container.get(CreateDefectListManager);

export const uploadImagesHandler = async (
  request: Request,
  h: ResponseToolkit
): Promise<Lifecycle.ReturnValue> => {
  const data = request.payload;

  // const images = data.images;
  // const response = await fileHandler(images);

  const result = parse(data);

  const value: any[] = [];

  try {
    let part;
    // tslint:disable-next-line:no-conditional-assignment
    while ((part = await result)) {
      value.push(part);

      if (part.length) {
        const resultt = await manager.execute(
          Deserialize(JSON.parse(part[1]), DefectList)!
        );

        console.log(
          "Result",
          resultt.isSuccess ? resultt.data.entries() : resultt.error.message
        );
      } else {
        part.pipe(fs.createWriteStream("/tmp/BBBBBBBBB_" + part.filename));
      }
    }
  } catch (err) {
    logInfo("Error", err);
    return err;
  }

  return value;
};

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
