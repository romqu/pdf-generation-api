import { hashValue } from "../../../util/argon2Util";
import { Response } from "../../model/response";

export class HashPasswordTask {
  public async execute(password: string): Promise<Response<string>> {
    return await hashValue(password);
  }
}
