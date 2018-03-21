import * as argon2 from "argon2";

import { ErrorTag } from "../constants";
import { ResponsePromise } from "../domain/model/response";
import { failableAsync } from "./failableUtil";

export function hashValue(value: string): ResponsePromise<string> {
  return failableAsync(ErrorTag.ARGON2_HASH, () =>
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
  return failableAsync(ErrorTag.ARGON2_HASH_VERIFY, () =>
    argon2.verify(hash, password)
  );
}
