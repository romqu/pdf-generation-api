import { Deserialize } from "cerialize";

import { ClientSessionEntity } from "./clientSessionEntity";

export class ClientSessionRepo {
  private readonly redis: any;

  constructor(redisP: any) {
    this.redis = redisP;
  }

  public async insert(params: {
    key: string;
    value: ClientSessionEntity;
  }): Promise<any> {
    return await this.redis.setAsync(params.key, JSON.stringify(params.value));
  }

  public async get(params: { key: string }): Promise<ClientSessionEntity> {
    const result = await this.redis.getAsync(params.key);

    return Deserialize(JSON.parse(result), ClientSessionEntity);
  }
}
