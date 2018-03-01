import { LoginCredentialsEntity } from "../../../data/login_credentials/loginCredentialsEntity";
import { LoginCredentialsRepo } from "../../../data/login_credentials/loginCredentialsRepo";
import { LoginCredentials } from "../../model/loginCredentials";
import { HashPasswordTask } from "./hashPasswordTask";

export class RegistrationManager {
  private readonly hashPasswordTask: HashPasswordTask;
  private readonly loginCredentialsRepo: LoginCredentialsRepo;

  constructor(
    hashPasswordTask: HashPasswordTask,
    loginCredentialsRepo: LoginCredentialsRepo
  ) {
    this.hashPasswordTask = hashPasswordTask;
    this.loginCredentialsRepo = loginCredentialsRepo;
  }

  public async execute(loginCredentials: LoginCredentials): Promise<number> {
    const doesEmailExist = await this.loginCredentialsRepo.doesEmailExist(
      loginCredentials.email
    );

    const passwordHashV = await this.hashPasswordTask.execute(
      loginCredentials.password
    );

    return await this.loginCredentialsRepo.insert(
      new LoginCredentialsEntity({
        id: 0,
        email: loginCredentials.email,
        passwordHash: passwordHashV
      })
    );
  }
}
