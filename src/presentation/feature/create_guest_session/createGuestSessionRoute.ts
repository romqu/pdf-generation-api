import { ServerRoute } from "hapi";
import { createGuestSessionHandler } from "./createGuestSessionHandler";

export function registrationRoute(): ServerRoute {
  return {
    method: "POST",
    path: "/session/guest",
    options: {
      auth: false
    },
    handler: createGuestSessionHandler
  };
}
