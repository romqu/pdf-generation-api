import { ResponsePromise } from "../../domain/model/response";
import { callAsync } from "../../util/failableUtil";
import { deserializeObject, serializeObject } from "../../util/jsonUtil";
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
    return callAsync<string>(async ({ success, run }) => {
      const data = run<string>(
        serializeObject(params.value, ClientSessionEntity)
      );

      run<string>(
        await this.memoryDataSource.insert({
          key: params.value.uuid,
          value: data
        })
      );

      return success(params.value.uuid);
    });
  }

  public get(params: { key: string }): ResponsePromise<ClientSessionEntity> {
    return callAsync<ClientSessionEntity>(async ({ success, run }) => {
      const result = run<string>(
        await this.memoryDataSource.get({ key: params.key })
      );

      const client = run<ClientSessionEntity>(
        deserializeObject(result, ClientSessionEntity)
      );

      return success(client);
    });
  }
}
