import { ServerRoute } from "hapi";

import { createFullDefectListHandler } from "./createFullDefectListHandler";

export function createFullDefectListRoute(): ServerRoute {
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
    handler: createFullDefectListHandler
  };
}
