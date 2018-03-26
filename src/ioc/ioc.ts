import { Container, ContainerModule } from "inversify";
import { IDatabase } from "pg-promise";

import { DiskDataSource } from "../data/diskDataSource";
import * as Database from "../database";
import { TYPES } from "./types";

const dbClients = Database.init();

const thirdPartyDependencies = new ContainerModule((bind): void => {
  bind<IDatabase<any>>(TYPES.PgpDb).toConstantValue(dbClients.pgpDb);
});

const applicationDependencies = new ContainerModule((bind): void => {
  bind(DiskDataSource)
    .toSelf()
    .inSingletonScope();
});

const container = new Container();

container.load(thirdPartyDependencies, applicationDependencies);

export { container };
