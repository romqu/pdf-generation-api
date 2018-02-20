import * as Hapi from "hapi";
import { imageHandler } from "./handler";

export function register(server: Hapi.Server): void {
  server.route({
    method: "POST",
    path: "/images",
    options: {
      payload: {
        output: "stream",
        parse: true,
        allow: "multipart/form-data"
      }
    },
    handler: imageHandler
  });
}
