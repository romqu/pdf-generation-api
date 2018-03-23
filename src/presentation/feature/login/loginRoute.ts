import { ServerRoute } from "hapi";
import * as Joi from "joi";

export function registrationRoute(): ServerRoute {
  return {
    method: "POST",
    path: "/login",
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
          }).required()
        }
      }
    },
    handler: {}
  };
}
