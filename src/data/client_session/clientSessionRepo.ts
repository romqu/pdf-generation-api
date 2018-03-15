import { Deserialize } from "cerialize";
import { RedisClient } from "redis";

import { Response } from "../../domain/model/response";
import { callAsync, callAsyncTwo } from "../../util/failableUtil";
import { ClientSessionEntity } from "./clientSessionEntity";

export class ClientSessionRepo {
  private readonly redis: RedisClient;

  constructor(redis: any) {
    this.redis = redis;
  }

  public async insert(params: {
    value: ClientSessionEntity;
  }): Promise<Response<string>> {
    return callAsync<string>(async ({ success, run, failable }) => {
      const result = await run<string>(
        await failable<string>(() =>
          this.redis.setAsync(params.value.uuid, JSON.stringify(params.value))
        )
      );
      return success(result);
    });
  }

  public async get(params: {
    key: string;
  }): Promise<Response<ClientSessionEntity>> {
    callAsyncTwo<ClientSessionEntity>(async ({ success, run, failable }) => {
      const result = await run<any>(
        await failable(() => this.redis.getAsync(params.key))
      );

      const client = Deserialize(JSON.parse(result), ClientSessionEntity);

      return success(client);
    });
    try {
      const result = await this.redis.getAsync(params.key);
      const client = Deserialize(JSON.parse(result), ClientSessionEntity);

      return { isSuccess: true, data: client };
    } catch (error) {
      return { isSuccess: false, errorMessage: error };
    }
  }
}
