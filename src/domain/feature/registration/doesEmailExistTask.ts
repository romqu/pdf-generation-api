import { LoginCredentialsRepo } from "../../../data/login_credentials/loginCredentialsRepo";
import { Response } from "../../model/response";

export class DoesEmailExistTask {
  private readonly loginCredentialsRepo: LoginCredentialsRepo;

  constructor(loginCredentialsRepo: LoginCredentialsRepo) {
    this.loginCredentialsRepo = loginCredentialsRepo;
  }

  public async execute(email: string): Promise<Response<boolean>> {
    return await this.loginCredentialsRepo.doesEmailExist(email);
  }
}
