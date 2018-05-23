import { Deserialize, Serialize, serializeAs } from "cerialize";
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

export function serializeToJsonObject<T extends object>(
  data: T,
  type: SerializableType<T>
): JsonObject {
  return Serialize(data, type)!;
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

// -------------------------------------------------------------------------------------------------------------

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

export function stringifyParseDeserializeData<T>(
  data: any,
  type: SerializableType<T>
): Response<T> {
  return deserializeData(stringifyParseData(data), type);
}

// Serialize

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
