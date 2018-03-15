import { ClientSessionRepo } from "./data/client_session/clientSessionRepo";
import { DiskDataSource } from "./data/diskDataSource";
import { pgDb, redisClient } from "./database";
import { logger } from "./util/loggerUtil";

async function test(): Promise<any> {
  const csr = new ClientSessionRepo(redisClient);
  /*const result = await csr.insert({
    key: "abcd",
    value: new ClientSessionEntity("5555", 2, "t8wqtewqte")
  });

  const r = await csr.get({ key: "abcd" });*/

  // const result = await csr.get({ key: "abcd" });

  // const result = await new RegistrationManager(
  //   new HashPasswordTask(),
  //   new LoginCredentialsRepo(pgDb)
  // ).execute(new LoginCredentials({ email: "test@1234.de", password: "test" }));

  // const result = await new LoginCredentialsRepo(pgDb).insert(
  //   new LoginCredentialsEntity({
  //     id: 0,
  //     email: "wqewqdwqdewqdwq",
  //     passwordHash: "ASAEwqdw"
  //   })
  // );

  const r = await new DiskDataSource(pgDb).queryOne<number>(
    "/data/login_credentials/sql/insertOne.sql",
    {
      email: "loginCredentials.email",
      passwordHash: "abcdg"
    }
  );

  logger.info(r);
}

test();
