import { ResponsePromise } from "../../domain/model/response";
import { provide } from "../../ioc/ioc";
import { callAsync } from "../../util/failableUtil";
import { DiskDataSource, IReturnedId } from "../diskDataSource";
import { CreateDefectListEntity } from "./createDefectListEntity";

@provide(CreateDefectListRepo)
  .inSingletonScope()
  .done()
export class CreateDefectListRepo {
  private readonly disk: DiskDataSource;

  constructor(disk: DiskDataSource) {
    this.disk = disk;
  }

  public insert(entity: CreateDefectListEntity): ResponsePromise<number> {
    return callAsync(async ({ success, run }) => {
      const result = run(
        await this.disk.queryOne<IReturnedId>(
          "/data/create_defect_list/sql/createBasicDefectList.sql",
          {
            dLname: entity.name,
            clientId: entity.clientId,
            postalCode: entity.streetAddressEntity.postalCode,
            sAname: entity.streetAddressEntity.name,
            number: entity.streetAddressEntity.number,
            additional: entity.streetAddressEntity.additional
          }
        )
      );

      return success(result.id);
    });
  }
}
