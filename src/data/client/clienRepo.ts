import { provideSingleton } from "../../core/ioc/ioc";
import { ResponsePromise } from "../../domain/model/response";
import { callAsync } from "../../util/failableUtil";
import { stringifyParseDeserializeData } from "../../util/jsonUtil";
import { DiskDataSource, IReturnedId } from "../diskDataSource";
import { ClientEntity } from "./clientEntity";

@provideSingleton(ClientRepo)
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

      const entity = run(stringifyParseDeserializeData(result, ClientEntity));

      return success(entity);
    });
  }

  public getForAndSurnameById(id: number): ResponsePromise<ClientEntity> {
    return callAsync(async ({ success, run }) => {
      const result = run(
        await this.disk.queryOne<IReturnedId>(
          "/data/client/sql/getForAndSurnameById.sql",
          {
            id
          }
        )
      );

      const entity = run(
        stringifyParseDeserializeData<ClientEntity>(result, ClientEntity)
      );

      return success(entity);
    });
  }
}
