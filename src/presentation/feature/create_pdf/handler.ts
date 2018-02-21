import { Deserialize } from "cerialize";
import { Lifecycle, Request, ResponseToolkit } from "hapi";

import { logger } from "../../../util/logger";
import { DefectList } from "../../model/defectList";

export async function createPdfHandler(
  request: Request,
  h: ResponseToolkit
): Promise<Lifecycle.ReturnValue> {
  const data = request.payload;

  const defectList: DefectList = Deserialize(data, DefectList);

  logger.info(defectList.address);

  return defectList;
}
