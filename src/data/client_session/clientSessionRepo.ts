import { ResponsePromise } from "../../domain/model/response";
import { provide } from "../../ioc/ioc";
import { callAsync } from "../../util/failableUtil";
import {
  parseDeserializeObject,
  serializeStringifyData
} from "../../util/jsonUtil";
import { MemoryDataSource } from "../memoryDataSource";
import { ClientSessionEntity } from "./clientSessionEntity";

@provide(ClientSessionRepo)
  .inSingletonScope()
  .done()
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

      const client = run(parseDeserializeObject(result, ClientSessionEntity));

      return success(client);
    });
  }
}
