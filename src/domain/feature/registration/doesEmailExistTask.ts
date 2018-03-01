import { LoginCredentialsRepo } from "../../../data/login_credentials/loginCredentialsRepo";

export class DoesEmailExistTask {
  private readonly loginCredentialsRepo: LoginCredentialsRepo;

  constructor(loginCredentialsRepo: LoginCredentialsRepo) {
    this.loginCredentialsRepo = loginCredentialsRepo;
  }

  public async execute(email: string): Promise<boolean> {
    return await this.loginCredentialsRepo.doesEmailExist(email);
  }
}
