import { Deserialize, Serialize } from "cerialize";
import * as stream from "stream";

import { Response } from "../domain/model/response";
import { failable, matchResponse } from "./failableUtil";

export function serializeSafeObject(
  data: object,
  // tslint:disable-next-line:ban-types
  type: Function
): string {
  return stringifyObject(Serialize(data, type));
}

export function serializeObject(
  data: object,
  // tslint:disable-next-line:ban-types
  type: Function
): Response<string> {
  return failable<string>(
    { type: "SERIALIZE", code: 105, title: "Serialize Object Error" },
    () => stringifyObject(Serialize(data, type))
  );
}

export function deserializeObject<T>(
  data: any,
  // tslint:disable-next-line:ban-types
  type: Function
): Response<T> {
  return failable<T>(
    { type: "DESERIALIZE", code: 105, title: "Deserialize Object Error" },
    () => Deserialize(data, type)
  );
}

export function stringifyDeserializeObject<T>(
  data: any,
  // tslint:disable-next-line:ban-types
  type: Function
): Response<T> {
  return deserializeObject(stringifyObject(data), type);
}

export function parseDeserializeObject<T>(
  data: any,
  // tslint:disable-next-line:ban-types
  type: Function
): Response<T> {
  return deserializeObject(JSON.parse(data), type);
}

export function parseStringifyDeserializeObject<T>(
  data: any,
  // tslint:disable-next-line:ban-types
  type: Function
): Response<T> {
  return deserializeObject(JSON.parse(stringifyObject(data)), type);
}

export function stringifyObject(data: any): string {
  return JSON.stringify(data);
}

export function deserializePayload<T>(
  payload: stream.Readable | Buffer | string | object,
  // tslint:disable-next-line:ban-types
  type: Function
): Response<T> {
  return matchResponse<T, Response<T>>(
    deserializeObject<T>(payload, type),
    (data): Response<T> => ({ isSuccess: true, data }),
    (error): Response<T> => {
      return { isSuccess: false, error };
    }
  );
}
