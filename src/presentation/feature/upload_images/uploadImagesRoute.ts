import { ServerRoute } from "hapi";
import * as Joi from "joi";
import { Readable } from "stream";

import { uploadImagesHandler } from "./uploadImagesHandler";

export function uploadImagesRoute(): ServerRoute {
  return {
    method: "POST",
    path: "/images",
    options: {
      auth: false,
      payload: {
        output: "file",
        parse: true,
        allow: "multipart/form-data"
      }
      // validate: {
      //   payload: {
      //     images: Joi.object().type(Readable)
      //   }
      // }
    },
    handler: uploadImagesHandler
  };
}
