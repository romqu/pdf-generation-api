import { hashValue } from "../../../util/argon2Util";

export class HashPasswordTask {
  public async execute(password: string): Promise<string> {
    return await hashValue(password);
  }
}
