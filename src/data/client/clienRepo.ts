import { ResponsePromise } from "../../domain/model/response";
import { DiskDataSource } from "../diskDataSource";
import { ClientEntity } from "./clientEntity";

export class ClientRepo {
  public readonly disk: DiskDataSource;

  constructor(disk: DiskDataSource) {
    this.disk = disk;
  }

  public insert(clientEntity: ClientEntity): ResponsePromise<number> {
    return this.disk.queryOne<number>("/data/client/sql/insertOne.sql", {
      forename: clientEntity.forename,
      surname: clientEntity.surname
    });
  }
}
