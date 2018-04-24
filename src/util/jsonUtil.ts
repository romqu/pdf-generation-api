import { Deserialize, Serialize } from "cerialize";
import { JsonObject, SerializableType } from "cerialize/dist/util";

import { Response } from "../domain/model/response";
import { failable, matchResponse } from "./failableUtil";

export function serializeSafeObject<T extends object>(
  data: T,
  type: SerializableType<T>
): string {
  return stringifyObject(Serialize<T>(data, type));
}

export function serializeObject<T extends object>(
  data: T,
  type: SerializableType<T>
): Response<string> {
  return failable<string>(
    { type: "SERIALIZE", code: 105, title: "Serialize Object Error" },
    () => stringifyObject(Serialize(data, type))
  );
}

export function deserializeSafeObject<T>(
  data: JsonObject,
  // tslint:disable-next-line:ban-types
  type: SerializableType<T>
): T {
  return Deserialize(data, type)!;
}

export function deserializeObject<T>(
  data: JsonObject,
  // tslint:disable-next-line:ban-types
  type: SerializableType<T>
): Response<T> {
  return failable<T>(
    { type: "DESERIALIZE", code: 105, title: "Deserialize Object Error" },
    () => Deserialize(data, type)!
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
  type: SerializableType<T>
): Response<T> {
  return deserializeObject(JSON.parse(data), type);
}

export function parseDeserializeSafeObject<T>(
  data: any,
  type: SerializableType<T>
): T {
  return deserializeSafeObject(JSON.parse(data), type);
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
  payload: any,
  type: SerializableType<T>
): Response<T> {
  return matchResponse<T, Response<T>>(
    parseDeserializeObject<T>(payload, type),
    (data): Response<T> => ({ isSuccess: true, data }),
    (error): Response<T> => {
      return { isSuccess: false, error };
    }
  );
}
