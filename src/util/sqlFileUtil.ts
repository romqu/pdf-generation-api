import * as path from "path";
import { QueryFile } from "pg-promise";

import { pgp } from "../database";

export function getQueryFile(fileName: string): QueryFile {
  const fullPath = path.join(".", fileName);
  return new pgp.QueryFile(fullPath, { minify: true });
}
