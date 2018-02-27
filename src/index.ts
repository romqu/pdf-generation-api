import { ClientSessionEntity } from "./data/client_session/clientSessionEntity";
import { ClientSessionRepo } from "./data/client_session/clientSessionRepo";
import { redisClient } from "./database";
import { logger } from "./util/logger";

async function test(): Promise<any> {
  const csr = new ClientSessionRepo(redisClient);
  await csr.insert({
    key: "abcd",
    value: new ClientSessionEntity("5555", 2, "t8wqtewqte")
  });

  const result = await csr.get({ key: "abcd" });

  logger.info(result);

  /*await new RegisterManager(
    new HashPasswordTask(argon2),
    new LoginCredentialsRepository(pgDb)
  ).execute(new LoginCredentials({ email: "test@test.de", password: "test" }));*/
}

test();
