import parse = require("await-busboy");
import fs = require("fs");
import { Lifecycle, Request, ResponseToolkit } from "hapi";

import { logInfo } from "../../../util/loggerUtil";
import { generateUuidv4 } from "../../../util/uuidv4Util";

// import busboy from "then-busboy";
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

  // const result = await busboy(data);

  const result = parse(data, {
    autoFields: true
  });

  const value: any[] = [];

  try {
    let part;
    while ((part = await result)) {
      // it's a stream
      value.push(part);
      part.pipe(fs.createWriteStream("/tmp/myfile" + value.length));
    }
  } catch (err) {
    logInfo("Error", err);
    return err;
  }

  return value;
};

async function filesHandler(files: any): Promise<string[]> {
  const promises = files.map(x => fileHandler(x));

  return Promise.all<string>(promises);
}

async function fileHandler(file: any): Promise<string> {
  if (!file) {
    throw new Error("no file");
  }

  const orignalName = file.hapi.filename;

  if (!imageFilter(orignalName)) {
    throw new Error("file type not allowed");
  }

  const fileStream = fs.createWriteStream(
    `./uploads/${generateUuidv4()}${orignalName}`
  );

  return new Promise<string>((resolve, reject): void => {
    file.on("error", err => {
      reject(err);
    });

    file.pipe(fileStream);

    file.on("end", err => {
      resolve("end");
    });
  });
}
