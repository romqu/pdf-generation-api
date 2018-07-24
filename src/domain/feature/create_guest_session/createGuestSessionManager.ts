import { provideSingleton } from "../../../core/ioc/ioc";
import { LoginIn } from "../../../presentation/model/loginIn";
import { callAsync } from "../../../util/failableUtil";
import { ResponsePromise } from "../../model/response";
import { CreateClientSessionTask } from "../registration/createClientSessionTask";

@provideSingleton(CreateGuestSessionManager)
export class CreateGuestSessionManager {
  private readonly createClientSessionTask: CreateClientSessionTask;

  constructor(createClientSessionTask: CreateClientSessionTask) {
    this.createClientSessionTask = createClientSessionTask;
  }

  public execute(): ResponsePromise<string> {
    return callAsync(async ({ success, run }) => {
      const sessionToken = run(
        await this.createClientSessionTask.execute(new LoginIn("", ""), true, 0)
      );

      return success(sessionToken);
    });
  }
}
