import { provideSingleton } from "../../core/ioc/ioc";
import { ResponsePromise } from "../../domain/model/response";
import { callAsync } from "../../util/failableUtil";
import {
  parseDeserializeData,
  serializeStringifyData
} from "../../util/jsonUtil";
import { MemoryDataSource } from "../memoryDataSource";
import { ClientSessionEntity } from "./clientSessionEntity";

@provideSingleton(ClientSessionRepo)
export class ClientSessionRepo {
  private readonly memoryDataSource: MemoryDataSource;

  constructor(memoryDataSource: MemoryDataSource) {
    this.memoryDataSource = memoryDataSource;
  }

  public insert(params: {
    value: ClientSessionEntity;
  }): ResponsePromise<string> {
    return callAsync(async ({ success, run }) => {
      const data = run(
        serializeStringifyData(params.value, ClientSessionEntity)
      );

      run(
        await this.memoryDataSource.insert({
          key: params.value.uuid,
          value: data
        })
      );

      return success(params.value.uuid);
    });
  }

  public get(params: { key: string }): ResponsePromise<ClientSessionEntity> {
    return callAsync(async ({ success, run }) => {
      const result = run(await this.memoryDataSource.get({ key: params.key }));

      const client = run(parseDeserializeData(result, ClientSessionEntity));

      return success(client);
    });
  }
}
