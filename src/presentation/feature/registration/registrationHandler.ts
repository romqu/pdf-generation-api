import { Deserialize } from "cerialize";
import { Lifecycle, Request, ResponseToolkit } from "hapi";

import { ClientRepo } from "../../../data/client/clienRepo";
import { ClientSessionRepo } from "../../../data/client_session/clientSessionRepo";
import { DiskDataSource } from "../../../data/diskDataSource";
import { LoginCredentialsRepo } from "../../../data/login_credentials/loginCredentialsRepo";
import { MemoryDataSource } from "../../../data/memoryDataSource";
import { pgDb, redisClient } from "../../../database";
import { CreateClientSessionTask } from "../../../domain/feature/registration/createClientSessionTask";
import { CreateClientTask } from "../../../domain/feature/registration/createClientTask";
import { DoesEmailExistTask } from "../../../domain/feature/registration/doesEmailExistTask";
import { HashPasswordTask } from "../../../domain/feature/registration/hashPasswordTask";
import { RegistrationManager } from "../../../domain/feature/registration/registrationManager";
import { RegistrationData } from "../../../domain/model/registrationData";
import { logger } from "../../../util/loggerUtil";
import { RegistrationController } from "./registrationController";

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

export async function registrationHandler(
  request: Request,
  h: ResponseToolkit
): Promise<Lifecycle.ReturnValue> {
  const data = request.payload;

  logger.info("payload", data);

  const registrationData: RegistrationData = Deserialize(
    data,
    RegistrationData
  );

  const controller = new RegistrationController(manager);

  const result = await controller.execute(registrationData);

  return result.isSuccess ? result.data : result.error.value.message;
}
