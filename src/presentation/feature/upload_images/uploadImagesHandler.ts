import parse = require("await-busboy");
import { Deserialize } from "cerialize";
import fs = require("fs");
import { Lifecycle, Request, ResponseToolkit } from "hapi";

import { Creator } from "../../../domain/model/document/creator";
import { logInfo } from "../../../util/loggerUtil";
import { generateUuidv4 } from "../../../util/uuidv4Util";
import { DefectList } from "../../../domain/model/document/defectList";

const imageFilter = (fileName: string): boolean => {
  // accept image only
  if (!fileName.match(/\.(jpg|jpeg|png)$/)) {
    return false;
  }

  return true;
};

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

      part = await result;

      if (part.length) {
        logInfo(
          "JSON",
          Deserialize(JSON.parse(part[1]), DefectList)!.streetAddress.postalCode
        );
      } else {
        part.pipe(fs.createWriteStream("/tmp/BBBBBBBBB_" + part.filename));
      }
    }
  } catch (err) {
    logInfo("Error", err);
    return err;
  }

  logInfo("RESULT", result.isClosed);

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
}
