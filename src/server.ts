import * as Hapi from "hapi";

import { registrationRoute } from "./presentation/feature/registration/registrationRoute";

import * as AuthBearer from "hapi-auth-bearer-token";

export async function init(): Promise<Hapi.Server> {
  const server = new Hapi.Server({
    host: "localhost",
    port: 3000,
    routes: {
      cors: {
        origin: ["*"]
      }
    }
  });

  registerRoutes(server);
  registerPlugins(server);

  return server;
}

function registerRoutes(server: Hapi.Server): void {
  server.route(registrationRoute());
}

async function registerPlugins(server: Hapi.Server): Promise<any> {
  await server.register(AuthBearer);

  server.auth.strategy("simple", "bearer-access-token", {
    validate: async (request: any, token: any, h: any): Promise<any> => {
      // here is where you validate your token
      // comparing with token from your database for example
      const isValid = token === "1234";

      const credentials = { token };
      const artifacts = { test: "info" };

      return { isValid, credentials, artifacts };
    }
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
