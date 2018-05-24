import { Deserialize, Serialize } from "cerialize";
import { JsonObject, SerializableType } from "cerialize/dist/util";

import { Response } from "../domain/model/response";
import { failable, matchResponse } from "./failableUtil";

export function deserializePayload<T>(
  payload: any,
  type: SerializableType<T>
): Response<T> {
  return matchResponse<T, Response<T>>(
    stringifyParseDeserializeData<T>(payload, type),
    (data): Response<T> => ({ isSuccess: true, data }),
    (error): Response<T> => {
      return { isSuccess: false, error };
    }
  );
}

// Serialize

export function serializeToJsonObject<T extends object>(
  data: T,
  type: SerializableType<T>
): JsonObject {
  return unsafeSerializeData(data, type);
}

export function serializeStringifyData<T>(
  data: T,
  type: SerializableType<T>
): Response<string> {
  return failable<string>(
    { type: "SERIALIZE", code: 106, title: "Serialize Data Error" },
    () => stringifyData(unsafeSerializeData(data, type))
  );
}

export function serializeData<T>(
  data: T,
  type: SerializableType<T>
): Response<JsonObject> {
  return failable<JsonObject>(
    { type: "SERIALIZE", code: 106, title: "Serialize Data Error" },
    () => unsafeSerializeData(data, type)
  );
}

export function unsafeSerializeData<T>(
  data: T,
  type: SerializableType<T>
): JsonObject {
  return Serialize(data, type)!;
}

// Deserialize

export function stringifyParseDeserializeData<T>(
  data: any,
  type: SerializableType<T>
): Response<T> {
  return deserializeData(stringifyParseData(data), type);
}

export function parseDeserializeData<T>(
  data: any,
  type: SerializableType<T>
): Response<T> {
  return deserializeData(parseData(data), type);
}

export function deserializeData<T>(
  data: JsonObject,
  type: SerializableType<T>
): Response<T> {
  return failable<T>(
    { type: "DESERIALIZE", code: 105, title: "Deserialize Data Error" },
    () => unsafeDeserializeData(data, type)
  );
}

export function unsafeDeserializeData<T>(
  data: JsonObject,
  type: SerializableType<T>
): T {
  return Deserialize(data, type)!;
}

// Json stringify, parse

export function stringifyParseData(data: any): JsonObject {
  return parseData(stringifyData(data));
}

export function parseData(data: string): JsonObject {
  return JSON.parse(data);
}

export function stringifyData(data: any): string {
  return JSON.stringify(data);
}
