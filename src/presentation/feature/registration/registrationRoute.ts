import { ServerRoute } from "hapi";
import * as Joi from "joi";

import { registrationHandler } from "./registrationHandler";

export function registrationRoute(): ServerRoute {
  return {
    method: "POST",
    path: "/registration",
    options: {
      auth: false,
      validate: {
        payload: {
          loginCredentials: Joi.object({
            email: Joi.string()
              .trim()
              .email({ minDomainAtoms: 2 })
              .required(),
            password: Joi.string()
              .trim()
              .min(8)
              .max(30)
              .required()
          }).required(),
          client: Joi.object({
            forename: Joi.string()
              .trim()
              .min(1)
              .required(),
            surname: Joi.string()
              .trim()
              .min(1)
              .required()
          })
        }
      }
    },
    handler: registrationHandler
  };
}
