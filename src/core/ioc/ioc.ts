import { Container, ContainerModule } from "inversify";
import {
  buildProviderModule,
  fluentProvide
} from "inversify-binding-decorators";
import { IDatabase, IMain } from "pg-promise";
import { RedisClient } from "redis";

import * as Database from "../../database";
import { TYPES } from "./types";

const dbClients = Database.init();

const thirdPartyDependencies = new ContainerModule(
  (bind): void => {
    bind<IMain>(TYPES.PgpMain).toConstantValue(dbClients.pgpMain);
    bind<IDatabase<any>>(TYPES.PgpDb).toConstantValue(dbClients.pgpDb);
    bind<RedisClient>(TYPES.RedisClient).toConstantValue(dbClients.redisClient);
  }
);

const provideSingleton = (serviceIdentifier: any): any => {
  return fluentProvide(serviceIdentifier)
    .inSingletonScope()
    .done();
};

const container = new Container();

container.load(buildProviderModule());
container.load(thirdPartyDependencies);

export { container, provideSingleton };
