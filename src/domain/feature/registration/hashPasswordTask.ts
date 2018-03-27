import { provide } from "../../../ioc/ioc";
import { hashValue } from "../../../util/argon2Util";
import { ResponsePromise } from "../../model/response";

@provide(HashPasswordTask)
  .inSingletonScope()
  .done()
export class HashPasswordTask {
  public execute(password: string): ResponsePromise<string> {
    return hashValue(password);
  }
}
