import * as argon2 from "argon2";

import { LoginCredentialsRepository } from "./data/login_credentials/loginCredentialsRepository";
import { pgDb, redisClient } from "./database";
import { LoginCredentials } from "./domain/model/loginCredentials";
import { HashPasswordTask } from "./domain/register/hashPasswordTask";
import { RegisterManager } from "./domain/register/registerManager";

async function test(): Promise<any> {
  await redisClient.setAsync("kid", "kid");

  await new RegisterManager(
    new HashPasswordTask(argon2),
    new LoginCredentialsRepository(pgDb)
  ).execute(new LoginCredentials({ email: "test@test.de", password: "test" }));
}

test();
