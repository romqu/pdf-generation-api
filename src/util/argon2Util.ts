import * as argon2 from "argon2";
import { Response } from "../domain/model/response";
import { failableAsync } from "./failableUtil";

export async function hashValue(value: string): Promise<Response<string>> {
  return failableAsync<string>(() =>
    argon2.hash(value, {
      type: argon2.argon2id,
      timeCost: 1,
      parallelism: 4,
      memoryCost: 5
    })
  );
}
