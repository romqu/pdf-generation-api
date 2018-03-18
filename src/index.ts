import { ClientRepo } from "./data/client/clienRepo";
import { ClientSessionRepo } from "./data/client_session/clientSessionRepo";
import { DiskDataSource } from "./data/diskDataSource";
import { LoginCredentialsRepo } from "./data/login_credentials/loginCredentialsRepo";
import { MemoryDataSource } from "./data/memoryDataSource";
import { pgDb, redisClient } from "./database";
import { CreateClientSessionTask } from "./domain/feature/registration/createClientSessionTask";
import { CreateClientTask } from "./domain/feature/registration/createClientTask";
import { DoesEmailExistTask } from "./domain/feature/registration/doesEmailExistTask";
import { HashPasswordTask } from "./domain/feature/registration/hashPasswordTask";
import { RegistrationManager } from "./domain/feature/registration/registrationManager";
import { Client } from "./domain/model/client";
import { LoginCredentials } from "./domain/model/loginCredentials";
import { Registration } from "./domain/model/registration";
import { logger } from "./util/loggerUtil";
import { generateUuidv4 } from "./util/uuidv4Util";

async function test(): Promise<any> {
  const memory = new MemoryDataSource(redisClient);
  const disk = new DiskDataSource(pgDb);
  const clientRepo = new ClientRepo(disk);
  const clientSessionRepo = new ClientSessionRepo(memory);

  const manager = new RegistrationManager(
    new DoesEmailExistTask(new LoginCredentialsRepo(disk)),
    new HashPasswordTask(),
    new CreateClientTask(clientRepo),
    new CreateClientSessionTask(clientSessionRepo),
    new LoginCredentialsRepo(disk)
  );

  const result = await manager.execute(
    new Registration(
      new LoginCredentials({
        email: generateUuidv4().slice(1, 20),
        password: "1234"
      }),
      new Client("Bert", "Ad")
    )
  );

  logger.info(
    "Result:",
    result.isSuccess ? result.data : result.error.value.stack
  );
}

test();
