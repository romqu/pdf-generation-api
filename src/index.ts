import { ClientSessionRepo } from "./data/client_session/clientSessionRepo";
import { LoginCredentialsRepo } from "./data/login_credentials/loginCredentialsRepo";
import { pgDb, redisClient } from "./database";
import { HashPasswordTask } from "./domain/feature/registration/hashPasswordTask";
import { RegistrationManager } from "./domain/feature/registration/registrationManager";
import { LoginCredentials } from "./domain/model/loginCredentials";
import { logger } from "./util/loggerUtil";

async function test(): Promise<any> {
  const csr = new ClientSessionRepo(redisClient);
  /*const result = await csr.insert({
    key: "abcd",
    value: new ClientSessionEntity("5555", 2, "t8wqtewqte")
  });

  const r = await csr.get({ key: "abcd" });*/

  // const result = await csr.get({ key: "abcd" });

  const result = await new RegistrationManager(
    new HashPasswordTask(),
    new LoginCredentialsRepo(pgDb)
  ).execute(new LoginCredentials({ email: "test@1234.de", password: "test" }));

  logger.info(result);
}

test();
