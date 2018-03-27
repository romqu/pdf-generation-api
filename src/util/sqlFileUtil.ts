import * as path from "path";
import { IMain, QueryFile } from "pg-promise";

import { container } from "../ioc/ioc";
import { TYPES } from "../ioc/types";

const pgpMain = container.get<IMain>(TYPES.PgpMain);

export function getQueryFile(fileName: string): QueryFile {
  const fullPath = path.join(".", fileName);
  return new pgpMain.QueryFile(fullPath, { minify: true });
}
