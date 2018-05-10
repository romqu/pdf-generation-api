import * as Boom from "boom";

import { ErrorModel } from "../presentation/model/errorModel";
import { ResponseModel } from "../presentation/model/responseModel";

export function boomToResponseModel(boom: Boom<any>): ResponseModel<string> {
  return new ResponseModel(false, "", [
    new ErrorModel(
      boom.output.payload.error,
      boom.output.payload.statusCode.toString(),
      boom.output.payload.error,
      boom.output.payload.message
    )
  ]);
}
