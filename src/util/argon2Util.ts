import * as argon2 from "argon2";

export async function hashValue(value: string): Promise<string> {
  return await argon2.hash(value, {
    type: argon2.argon2id,
    timeCost: 1,
    parallelism: 4,
    memoryCost: 5
  });
}
