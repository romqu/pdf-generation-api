import { LoginCredentialsEntity } from "../../data/login_credentials/loginCredentialsEntity";
import { LoginCredentialsRepository } from "../../data/login_credentials/loginCredentialsRepository";
import { LoginCredentials } from "../model/loginCredentials";
import { HashPasswordTask } from "./hashPasswordTask";

export class RegisterManager {
  private readonly hashPasswordTask: HashPasswordTask;
  private readonly loginCredentialsRepository: LoginCredentialsRepository;

  constructor(
    hashPasswordTaskP: HashPasswordTask,
    loginCredentialsRepositoryP: LoginCredentialsRepository
  ) {
    this.hashPasswordTask = hashPasswordTaskP;
    this.loginCredentialsRepository = loginCredentialsRepositoryP;
  }

  public async execute(loginCredentials: LoginCredentials): Promise<number> {
    const passwordHashV = await this.hashPasswordTask.execute(
      loginCredentials.password
    );

    return await this.loginCredentialsRepository.insert(
      new LoginCredentialsEntity({
        id: 0,
        email: loginCredentials.email,
        passwordHash: passwordHashV
      })
    );
  }
}
