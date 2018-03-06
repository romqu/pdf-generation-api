import { ClientSessionRepo } from "./data/client_session/clientSessionRepo";
import { LoginCredentialsEntity } from "./data/login_credentials/loginCredentialsEntity";
import { LoginCredentialsRepo } from "./data/login_credentials/loginCredentialsRepo";
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

  // logger.info(r);
  /*await new RegisterManager(
    new HashPasswordTask(argon2),
    new LoginCredentialsRepository(pgDb)
  ).execute(new LoginCredentials({ email: "test@test.de", password: "test" }));*/

  const result = await new LoginCredentialsRepo(pgDb).insert(
    new LoginCredentialsEntity({
      id: 0,
      email: "test@test.de",
      passwordHash: "test"
    })
  );

  logger.info(result.isSuccess ? result.data.id : result.errorMessage);
}

test();
