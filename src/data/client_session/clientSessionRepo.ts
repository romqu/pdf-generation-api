import { Deserialize, Serialize } from "cerialize";

import { ResponsePromise } from "../../domain/model/response";
import { callAsync } from "../../util/failableUtil";
import { MemoryDataSource } from "../memoryDataSource";
import { ClientSessionEntity } from "./clientSessionEntity";

export class ClientSessionRepo {
  private readonly memoryDataSource: MemoryDataSource;

  constructor(memoryDataSource: MemoryDataSource) {
    this.memoryDataSource = memoryDataSource;
  }

  public insert(params: {
    value: ClientSessionEntity;
  }): ResponsePromise<string> {
    return this.memoryDataSource.insert({
      key: params.value.uuid,
      value: JSON.stringify(Serialize(params.value, ClientSessionEntity))
    });
  }

  public get(params: { key: string }): ResponsePromise<ClientSessionEntity> {
    return callAsync<ClientSessionEntity>(async ({ success, run }) => {
      const result = run<string>(
        await this.memoryDataSource.get({ key: params.key })
      );

      const client = Deserialize(JSON.parse(result), ClientSessionEntity);

      return success(client);
    });
  }
}
