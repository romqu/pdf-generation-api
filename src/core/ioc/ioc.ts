import { Container, ContainerModule, interfaces } from "inversify";
import {
  buildProviderModule,
  fluentProvide
} from "inversify-binding-decorators";
import { IDatabase, IMain } from "pg-promise";

import * as Database from "../../database";
import { TYPES } from "./types";

const dbClients = Database.init();

const container = new Container();

export const thirdPartyDependencies = new ContainerModule(
  (bind): void => {
    bind<IMain>(TYPES.PgpMain).toConstantValue(dbClients.pgpMain);
    bind<IDatabase<any>>(TYPES.PgpDb).toConstantValue(dbClients.pgpDb);
    bind<any>(TYPES.RedisClient).toConstantValue(dbClients.redisClient);
  }
);

export function provideSingleton(
  serviceIdentifier: interfaces.ServiceIdentifier<any>
): any {
  return fluentProvide(serviceIdentifier)
    .inSingletonScope()
    .done();
}

container.load(thirdPartyDependencies);
container.load(buildProviderModule());

export { container };
