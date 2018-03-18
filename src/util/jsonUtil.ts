import { Deserialize, Serialize } from "cerialize";

import { ErrorTag } from "../constants";
import { Response } from "../domain/model/response";
import { failable } from "./failableUtil";

export function serializeObject(
  data: object,
  // tslint:disable-next-line:ban-types
  type: Function
): Response<string> {
  return failable<string>(ErrorTag.SERIALIZATION, () =>
    JSON.stringify(Serialize(data, type))
  );
}

export function deserializeObject<T>(
  data: string,
  // tslint:disable-next-line:ban-types
  type: Function
): Response<T> {
  return failable<T>(ErrorTag.DESERIALIZATION, () =>
    Deserialize(JSON.parse(data), type)
  );
}
