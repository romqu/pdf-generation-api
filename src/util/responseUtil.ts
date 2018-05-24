import * as Boom from "boom";

import { ErrorOut } from "../presentation/model/errorOut";
import { ResponseModel } from "../presentation/model/responseModel";

export function boomToResponseModel(boom: Boom<any>): ResponseModel<null> {
  return new ResponseModel(false, null, [
    new ErrorOut(
      boom.output.payload.error,
      boom.output.payload.statusCode.toString(),
      boom.output.payload.error,
      boom.output.payload.message
    )
  ]);
}
