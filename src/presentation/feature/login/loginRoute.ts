import { ServerRoute } from "hapi";
import * as Joi from "joi";

import { loginHandler } from "./loginHandler";

export function loginRoute(): ServerRoute {
  return {
    method: "POST",
    path: "/login",
    options: {
      auth: false,
      validate: {
        payload: {
          e_mail: Joi.string()
            .trim()
            .email({ minDomainAtoms: 2 })
            .required(),
          password: Joi.string()
            .replace(/\s/g, "")
            .min(8)
            .max(30)
            .required()
        }
      }
    },
    handler: loginHandler
  };
}
