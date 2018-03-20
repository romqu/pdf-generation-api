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
import * as Server from "./server";
import { logger } from "./util/loggerUtil";

async function test(): Promise<any> {}

async function start(): Promise<any> {
  try {
    const server = await Server.init();
    server.start();
    logger.info("successful");
  } catch (err) {
    logger.error(err);
  }
}

start();
