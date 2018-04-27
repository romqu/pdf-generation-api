import { Readable } from "stream";

export type Payload = Readable | Buffer | string | object;
