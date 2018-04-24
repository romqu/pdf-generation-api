import { ServerRoute } from "hapi";

import { downloadPdfHandler } from "./downloadPdfHandler";

export function downloadPdfRoute(): ServerRoute {
  return {
    method: "GET",
    path: "/document",
    options: {
      auth: false
    },
    handler: downloadPdfHandler
  };
}
