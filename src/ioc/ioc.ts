import { Container, ContainerModule } from "inversify";
import { makeFluentProvideDecorator } from "inversify-binding-decorators";
import { IDatabase } from "pg-promise";

import * as Database from "../database";
import { TYPES } from "./types";

const dbClients = Database.init();

const thirdPartyDependencies = new ContainerModule((bind): void => {
  bind<IDatabase<any>>(TYPES.PgpDb).toConstantValue(dbClients.pgpDb);
});

// const applicationDependencies = new ContainerModule((bind): void => {
//   bind(DiskDataSource)
//     .toSelf()
//     .inSingletonScope();
// });

const container = new Container();

const provide = makeFluentProvideDecorator(container);

container.load(thirdPartyDependencies);

export { container, provide };
