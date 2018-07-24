import * as Boom from "boom";
import * as Hapi from "hapi";

import { Lifecycle } from "hapi";
import * as AuthBearer from "hapi-auth-bearer-token";
import { authenticateClientHandler } from "./presentation/feature/authenticate_client/authenticateClienHandler";
import { createDefectListRoute } from "./presentation/feature/create_defect_list/createDefectListRoute";
import { downloadPdfRoute } from "./presentation/feature/download_pdf/downloadPdfRoute";
import { loginRoute } from "./presentation/feature/login/loginRoute";
import { registrationRoute } from "./presentation/feature/registration/registrationRoute";
import { testRoute } from "./presentation/feature/test/testRoute";
import { ResponseModel } from "./presentation/model/responseModel";
import { serializeToJsonObject } from "./util/jsonUtil";
import { logInfo } from "./util/loggerUtil";
import { boomToResponseModel } from "./util/responseUtil";

export async function init(): Promise<Hapi.Server> {
  const server = new Hapi.Server({
    host: "localhost",
    port: 3000,
    routes: {
      validate: {
        failAction: async (_, __, err): Promise<Hapi.Lifecycle.Method> => {
          if (process.env.NODE_ENV === "production") {
            throw Boom.badRequest(`Invalid request payload input`);
          } else {
            throw err;
          }
        }
      },
      cors: {
        origin: ["*"]
      }
    }
  });

  registerExtEvents(server);
  await registerPlugins(server);
  registerRoutes(server);

  return server;
}

function registerExtEvents(server: Hapi.Server): void {
  server.ext(
    "onPreResponse",
    async (request, _): Promise<Lifecycle.ReturnValue> => {
      const response = request.response;

      if (response instanceof Boom) {
        return serializeToJsonObject(
          boomToResponseModel(response),
          ResponseModel
        );
      } else if (response === null) {
        return serializeToJsonObject(
          boomToResponseModel(Boom.internal()),
          ResponseModel
        );
      } else {
        logInfo("pre", response.source);
        return response.source;
      }
    }
  );
}

function registerRoutes(server: Hapi.Server): void {
  server.route(testRoute());
  server.route(registrationRoute());
  server.route(loginRoute());
  server.route(createDefectListRoute());
  server.route(downloadPdfRoute());
}

async function registerPlugins(server: Hapi.Server): Promise<any> {
  await server.register(AuthBearer);

  server.auth.strategy("simple", "bearer-access-token", {
    validate: authenticateClientHandler
  });

  server.auth.default("simple");
}
