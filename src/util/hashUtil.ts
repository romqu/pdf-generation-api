import * as argon2 from "argon2";
import * as crypto from "crypto";

import { ResponsePromise } from "../domain/model/response";
import { failableAsync } from "./failableUtil";

export function hashValueArgon2(value: string): ResponsePromise<string> {
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

export function verifyValueArgon2(
  hash: string,
  value: string
): ResponsePromise<boolean> {
  return failableAsync(
    { type: "HASH_VERIFY", code: 106, title: "Verify Hash Error" },
    () => argon2.verify(hash, value)
  );
}

export function getSha256Hash(): string {
  return crypto
    .createHash("sha256")
    .update(getRandomString(16))
    .digest("hex");
}

function getRandomString(length: number): string {
  return crypto
    .randomBytes(Math.ceil(length / 2))
    .toString("hex")
    .slice(0, length);
}
