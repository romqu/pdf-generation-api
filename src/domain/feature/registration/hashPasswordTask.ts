import { provideSingleton } from "../../../core/ioc/ioc";
import { hashValueArgon2 } from "../../../util/hashUtil";
import { ResponsePromise } from "../../model/response";

@provideSingleton(HashPasswordTask)
export class HashPasswordTask {
  public execute(password: string): ResponsePromise<string> {
    return hashValueArgon2(password);
  }
}
