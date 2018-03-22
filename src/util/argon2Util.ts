import * as argon2 from "argon2";

import { ResponsePromise } from "../domain/model/response";
import { failableAsync } from "./failableUtil";

export function hashValue(value: string): ResponsePromise<string> {
  return failableAsync(
    { type: "HASH", code: 105, title: "Hashing Error" },
    () =>
      argon2.hash(value, {
        type: argon2.argon2id,
        timeCost: 1,
        parallelism: 4,
        memoryCost: 5
      })
  );
}

export function verifyHash(
  hash: string,
  password: string
): ResponsePromise<boolean> {
  return failableAsync(
    { type: "HASH_VERIFY", code: 106, title: "Verify Hash Error" },
    () => argon2.verify(hash, password)
  );
}
