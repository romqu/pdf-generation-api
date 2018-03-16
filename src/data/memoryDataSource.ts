import { RedisClient } from "redis";

import { ErrorTags } from "../constants";
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
      const result = run<string>(
        await failable<string>(ErrorTags.DB, () =>
          this.redis.setAsync(params.key, params.value)
        )
      );
      return success(result);
    });
  }

  public get(params: { key: string }): ResponsePromise<string> {
    return callAsync<string>(async ({ success, run, failable, failure }) => {
      const result = run<string>(
        await failable<string>(ErrorTags.DB, () =>
          this.redis.getAsync(params.key)
        )
      );

      if (result === null) {
        return failure(ErrorTags.DB, "Value does not exist");
      }

      return success(result);
    });
  }
}
