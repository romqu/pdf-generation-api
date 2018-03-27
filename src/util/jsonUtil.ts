import { Deserialize, Serialize } from "cerialize";

import { Response } from "../domain/model/response";
import { failable } from "./failableUtil";

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
  return failable<T>(
    { type: "DESERIALIZE", code: 105, title: "Deserialize Object Error" },
    () => Deserialize(stringifyObject(data), type)
  );
}

export function parseStringifyDeserializeObject<T>(
  data: any,
  // tslint:disable-next-line:ban-types
  type: Function
): Response<T> {
  return failable<T>(
    { type: "DESERIALIZE", code: 105, title: "Deserialize Object Error" },
    () => Deserialize(JSON.parse(stringifyObject(data)), type)
  );
}

export function stringifyObject(data: any): string {
  return JSON.stringify(data);
}
