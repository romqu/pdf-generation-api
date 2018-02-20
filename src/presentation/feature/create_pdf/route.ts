import * as Hapi from "hapi";

import { createPdfHandler } from "./handler";

export function register(server: Hapi.Server): void {
  server.route({
    method: "POST",
    path: "/defectlist",
    options: {},
    handler: createPdfHandler
  });
}
