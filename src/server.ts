import * as Boom from "boom";
import * as Hapi from "hapi";
import * as AuthBearer from "hapi-auth-bearer-token";

import { Lifecycle } from "hapi";
import { authenticateClientHandler } from "./presentation/feature/authenticate_client/authenticateClienHandler";
import { createFullDefectListRoute } from "./presentation/feature/create_full_defect_list/createFullDefectListRoute";
import { downloadPdfRoute } from "./presentation/feature/download_pdf/downloadPdfRoute";
import { loginRoute } from "./presentation/feature/login/loginRoute";
import { registrationRoute } from "./presentation/feature/registration/registrationRoute";
import { testRoute } from "./presentation/feature/test/testRoute";

export async function init(): Promise<Hapi.Server> {
  const server = new Hapi.Server({
    host: "localhost",
    port: 3000,
    routes: {
      validate: {
        failAction: async (request, h, err): Promise<Hapi.Lifecycle.Method> => {
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
  server.ext("onPreResponse", async (request, h): Promise<
    Lifecycle.ReturnValue
  > => {
    const response = request.response;

    if (response instanceof Boom) {
      return response;
    } else if (response === null) {
      return Boom.internal();
    } else {
      return response.source;
    }
  });
}

function registerRoutes(server: Hapi.Server): void {
  server.route(testRoute());
  server.route(registrationRoute());
  server.route(loginRoute());
  server.route(createFullDefectListRoute());
  server.route(downloadPdfRoute());
}

async function registerPlugins(server: Hapi.Server): Promise<any> {
  await server.register(AuthBearer);

  server.auth.strategy("simple", "bearer-access-token", {
    validate: authenticateClientHandler
  });

  server.auth.default("simple");
}

// function data(): void {
//   const creator = new Creator("Mike", "Meener");
//   const address = new Address("Musterstraße", 1, "a");
//   const participant = new Participant(
//     "Max",
//     "Mustermann",
//     "1234567",
//     "max@mustermann.de",
//     "Mustermann AG"
//   );
//   const image = new Image("mangel-border.jpg");
//   const defect = new Defect("Ist kaputt", "Bernd", "", [{ ...image }]);
//   const room = new Room("Wohnzimmer", 1, "Links neben der Küche", [
//     { ...defect }
//   ]);
//   const livingUnit = new LivingUnit(1, [{ ...room }]);
//   const floor = new Floor("EG", [{ ...livingUnit }]);
//   const defectList = new DefectList(
//     "1.1.1111",
//     creator,
//     address,
//     [{ ...participant }],
//     [{ ...floor }]
//   );
// }
