import { inject } from "inversify";
import { IDatabase, IMain, ITask } from "pg-promise";

import { provide } from "../../ioc/ioc";
import { TYPES } from "../../ioc/types";
import { logInfo } from "../../util/loggerUtil";
import { IReturnedId } from "../diskDataSource";

@provide(CreateFullDefectListRepo)
  .inSingletonScope()
  .done()
export class CreateFullDefectListRepo {
  private readonly pgDb: IDatabase<any>;
  private readonly pgMain: IMain;

  constructor(
    @inject(TYPES.PgpDb) pgDb: IDatabase<any>,
    @inject(TYPES.PgpMain) pgMain: IMain
  ) {
    this.pgDb = pgDb;
    this.pgMain = pgMain;
  }

  public test(): void {
    const csFloor = new this.pgMain.helpers.ColumnSet(
      [
        new this.pgMain.helpers.Column("name"),
        new this.pgMain.helpers.Column("street_address_id")
      ],
      new this.pgMain.helpers.TableName("floor")
    );

    const valuesFloor = [
      { name: "adasddsa", street_address_id: 1 },
      { name: "weweqwewe", street_address_id: 1 }
    ];

    const queryFloor =
      this.pgMain.helpers.insert(valuesFloor, csFloor) + "RETURNING id";

    const csRoom = new this.pgMain.helpers.ColumnSet(
      [
        new this.pgMain.helpers.Column("number"),
        new this.pgMain.helpers.Column("floor_id")
      ],
      new this.pgMain.helpers.TableName("living_unit")
    );

    this.pgDb.tx<IReturnedId>(async (t: ITask<IReturnedId>) => {
      const re = await t.map(
        queryFloor,
        valuesFloor,
        (row: IReturnedId) => +row.id
      );

      logInfo("re", re);

      return { id: 1 };
    });
  }
}
