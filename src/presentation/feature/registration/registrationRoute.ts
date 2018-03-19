import { ServerRoute } from "hapi";
import * as Hapi from "hapi";

import { registrationHandler } from "./registrationHandler";

export function registrationRoute(): ServerRoute {
  return {
    method: "POST",
    path: "/registration",
    options: { auth: false },
    handler: registrationHandler
  };
}
