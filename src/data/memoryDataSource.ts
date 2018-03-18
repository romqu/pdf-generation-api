import { RedisClient } from "redis";

import { ErrorTag } from "../constants";
import { ResponsePromise } from "../domain/model/response";
import { callAsync } from "../util/failableUtil";

export class MemoryDataSource {
  private readonly redis: RedisClient;

  constructor(redis: RedisClient) {
    this.redis = redis;
  }

  public insert(params: {
    key: string;
    value: string;
  }): ResponsePromise<string> {
    return callAsync(async ({ success, run, failable }) => {
      const result = run(
        await failable<string>(ErrorTag.DB, () =>
          this.redis.setAsync(params.key, params.value)
        )
      );
      return success(result);
    });
  }

  public get(params: { key: string }): ResponsePromise<string> {
    return callAsync(async ({ success, run, failable, failure }) => {
      const result = run(
        await failable<string>(ErrorTag.DB, () =>
          this.redis.getAsync(params.key)
        )
      );

      if (result === null) {
        return failure(ErrorTag.DB, "Value does not exist");
      }

      return success(result);
    });
  }
}
