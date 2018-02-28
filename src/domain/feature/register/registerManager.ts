import { LoginCredentialsEntity } from "../../../data/login_credentials/loginCredentialsEntity";
import { LoginCredentialsRepo } from "../../../data/login_credentials/loginCredentialsRepo";
import { LoginCredentials } from "../../model/loginCredentials";
import { HashPasswordTask } from "./hashPasswordTask";

export class RegisterManager {
  private readonly hashPasswordTask: HashPasswordTask;
  private readonly loginCredentialsRepository: LoginCredentialsRepo;

  constructor(
    hashPasswordTask: HashPasswordTask,
    loginCredentialsRepository: LoginCredentialsRepo
  ) {
    this.hashPasswordTask = hashPasswordTask;
    this.loginCredentialsRepository = loginCredentialsRepository;
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
