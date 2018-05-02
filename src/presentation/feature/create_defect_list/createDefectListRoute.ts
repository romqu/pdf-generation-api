import { ServerRoute } from "hapi";

import { createDefectListHandler } from "./createDefectListHandler";

export function createDefectListRoute(): ServerRoute {
  return {
    method: "POST",
    path: "/defect-lists",
    options: {
      payload: {
        output: "stream",
        parse: false,
        allow: "multipart/form-data",
        maxBytes: 1024 * 1024 * 50
      }
    },
    handler: createDefectListHandler
  };
}
