import { Container, ContainerModule } from "inversify";
import { makeFluentProvideDecorator } from "inversify-binding-decorators";
import { IDatabase, IMain } from "pg-promise";
import { RedisClient } from "redis";

import * as Database from "../database";
import { TYPES } from "./types";

const dbClients = Database.init();

const thirdPartyDependencies = new ContainerModule((bind): void => {
  bind<IMain>(TYPES.PgpMain).toConstantValue(dbClients.pgpMain);
  bind<IDatabase<any>>(TYPES.PgpDb).toConstantValue(dbClients.pgpDb);
  bind<RedisClient>(TYPES.RedisClient).toConstantValue(dbClients.redisClient);
});

const container = new Container();

const provide = makeFluentProvideDecorator(container);

container.load(thirdPartyDependencies);

export { container, provide };