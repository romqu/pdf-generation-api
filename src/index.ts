import { LoginCredentialsRepo } from "./data/login_credentials/loginCredentialsRepo";
import { pgDb } from "./database";
import { logger } from "./util/loggerUtil";

async function test(): Promise<any> {
  /*const csr = new ClientSessionRepo(redisClient);
  await csr.insert({
    key: "abcd",
    value: new ClientSessionEntity("5555", 2, "t8wqtewqte")
  });

  const result = await csr.get({ key: "abcd" });

  logger.info(result);*/
  /*await new RegisterManager(
    new HashPasswordTask(argon2),
    new LoginCredentialsRepository(pgDb)
  ).execute(new LoginCredentials({ email: "test@test.de", password: "test" }));*/
}

test();
