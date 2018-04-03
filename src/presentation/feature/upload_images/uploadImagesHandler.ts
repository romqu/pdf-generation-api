import fs = require("fs");
import { Lifecycle, Request, ResponseToolkit } from "hapi";
import { generateUuidv4 } from "../../../util/uuidv4Util";

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

  const images = data.images;
  // const response = await fileHandler(images);

  return request.payload.images[0];
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
