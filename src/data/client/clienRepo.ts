import { ResponsePromise } from "../../domain/model/response";
import { provide } from "../../ioc/ioc";
import { callAsync } from "../../util/failableUtil";
import { parseStringifyDeserializeObject } from "../../util/jsonUtil";
import { DiskDataSource, IReturnedId } from "../diskDataSource";
import { ClientEntity } from "./clientEntity";

@provide(ClientRepo)
  .inSingletonScope()
  .done()
export class ClientRepo {
  private readonly disk: DiskDataSource;

  constructor(disk: DiskDataSource) {
    this.disk = disk;
  }

  public insert(clientEntity: ClientEntity): ResponsePromise<number> {
    return callAsync(async ({ success, run }) => {
      const result = run(
        await this.disk.queryOne<IReturnedId>(
          "/data/client/sql/insertOne.sql",
          {
            forename: clientEntity.forename,
            surname: clientEntity.surname,
            loginCredentialsId: clientEntity.loginCredentialsId
          }
        )
      );

      return success(result.id);
    });
  }

  public getByLoginCredentialsId(
    loginId: number
  ): ResponsePromise<ClientEntity> {
    return callAsync(async ({ success, run }) => {
      const result = run(
        await this.disk.queryOne<IReturnedId>(
          "/data/client/sql/getByLoginCredentialsId.sql",
          {
            loginCredentialsId: loginId
          }
        )
      );

      const entity = run(
        parseStringifyDeserializeObject<ClientEntity>(result, ClientEntity)
      );

      return success(entity);
    });
  }
}
