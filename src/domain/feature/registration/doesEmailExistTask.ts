import { LoginCredentialsRepo } from "../../../data/login_credentials/loginCredentialsRepo";
import { ResponsePromise } from "../../model/response";

export class DoesEmailExistTask {
  private readonly loginCredentialsRepo: LoginCredentialsRepo;

  constructor(loginCredentialsRepo: LoginCredentialsRepo) {
    this.loginCredentialsRepo = loginCredentialsRepo;
  }

  public execute(email: string): ResponsePromise<boolean> {
    return this.loginCredentialsRepo.doesEmailExist(email);
  }
}
