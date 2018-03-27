import { LoginCredentialsRepo } from "../../../data/login_credentials/loginCredentialsRepo";
import { provide } from "../../../ioc/ioc";
import { ResponsePromise } from "../../model/response";

@provide(DoesEmailExistTask)
  .inSingletonScope()
  .done()
export class DoesEmailExistTask {
  private readonly loginCredentialsRepo: LoginCredentialsRepo;

  constructor(loginCredentialsRepo: LoginCredentialsRepo) {
    this.loginCredentialsRepo = loginCredentialsRepo;
  }

  public execute(email: string): ResponsePromise<boolean> {
    return this.loginCredentialsRepo.doesEmailExist(email);
  }
}
