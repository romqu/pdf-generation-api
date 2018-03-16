import { ClientSessionRepo } from "./data/client_session/clientSessionRepo";
import { DiskDataSource } from "./data/diskDataSource";
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

  const re = await new LoginCredentialsRepo(new DiskDataSource(pgDb)).insert(
    new LoginCredentialsEntity({ id: 0, email: "", passwordHash: "" })
  );

  logger.info(re);
}

test();
