import { inject } from "inversify";
import { RedisClient } from "redis";

import { provideSingleton } from "../core/ioc/ioc";
import { TYPES } from "../core/ioc/types";
import { ResponsePromise } from "../domain/model/response";
import { callAsync } from "../util/failableUtil";

@provideSingleton(MemoryDataSource)
export class MemoryDataSource {
  private readonly redis: /*RedisClient*/ any;

  constructor(@inject(TYPES.RedisClient) redis: RedisClient) {
    this.redis = redis;
  }

  public insert(params: {
    key: string;
    value: string;
  }): ResponsePromise<string> {
    return callAsync(async ({ success, run, failable }) => {
      const result = run(
        await failable<string>(
          { type: "MDB", code: 101, title: "Insert Error" },
          () => this.redis.setAsync(params.key, params.value)
        )
      );
      return success(result);
    });
  }

  public get(params: { key: string }): ResponsePromise<string> {
    return callAsync(async ({ success, run, failable, failure }) => {
      const result = run(
        await failable<string>(
          { type: "MDB", code: 102, title: "Get Error" },
          () => this.redis.getAsync(params.key)
        )
      );

      if (result === null || undefined) {
        return failure({
          type: "MDB",
          code: 103,
          title: "Value Error",
          message: "Value does not exist",
          stack: ""
        });
      }

      return success(result);
    });
  }
}
