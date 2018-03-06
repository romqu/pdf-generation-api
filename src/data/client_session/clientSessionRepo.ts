import { Deserialize } from "cerialize";

import { Response } from "../../domain/model/response";
import { ClientSessionEntity } from "./clientSessionEntity";

export class ClientSessionRepo {
  private readonly redis: any;

  constructor(redis: any) {
    this.redis = redis;
  }

  public async insert(params: {
    key: string;
    value: ClientSessionEntity;
  }): Promise<Response<string>> {
    try {
      const result = await this.redis.setAsync(
        params.key,
        JSON.stringify(params.value)
      );

      return { isSuccess: true, data: result };
    } catch (error) {
      return { isSuccess: false, errorMessage: error };
    }
  }

  public async get(params: {
    key: string;
  }): Promise<Response<ClientSessionEntity>> {
    try {
      const result = await this.redis.getAsync(params.key);
      const client = Deserialize(JSON.parse(result), ClientSessionEntity);

      return { isSuccess: true, data: client };
    } catch (error) {
      return { isSuccess: false, errorMessage: error };
    }
  }
}
