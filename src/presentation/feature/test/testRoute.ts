import { ServerRoute } from "hapi";
import * as Joi from "joi";

import { testHandler } from "./testHandler";

export function testRoute(): ServerRoute {
  return {
    method: "GET",
    path: "/test",
    options: {},
    handler: testHandler
  };
}
