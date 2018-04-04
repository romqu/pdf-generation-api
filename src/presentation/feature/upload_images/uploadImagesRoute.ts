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
        output: "stream",
        parse: false,
        allow: "multipart/form-data",
        maxBytes: 1024 * 1024 * 50
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
