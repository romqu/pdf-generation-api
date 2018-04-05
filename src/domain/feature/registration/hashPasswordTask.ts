import { provide } from "../../../ioc/ioc";
import { hashValueArgon2 } from "../../../util/hashUtil";
import { ResponsePromise } from "../../model/response";

@provide(HashPasswordTask)
  .inSingletonScope()
  .done()
export class HashPasswordTask {
  public execute(password: string): ResponsePromise<string> {
    return hashValueArgon2(password);
  }
}
