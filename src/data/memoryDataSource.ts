import { inject } from "inversify";
import { RedisClient } from "redis";

import { ResponsePromise } from "../domain/model/response";
import { provide } from "../ioc/ioc";
import { TYPES } from "../ioc/types";
import { callAsync } from "../util/failableUtil";

@provide(MemoryDataSource)
  .inSingletonScope()
  .done()
export class MemoryDataSource {
  private readonly redis: RedisClient;

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

      if (result === null) {
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
