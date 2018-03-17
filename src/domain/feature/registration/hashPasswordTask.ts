import { hashValue } from "../../../util/argon2Util";
import { ResponsePromise } from "../../model/response";

export class HashPasswordTask {
  public execute(password: string): ResponsePromise<string> {
    return hashValue(password);
  }
}
