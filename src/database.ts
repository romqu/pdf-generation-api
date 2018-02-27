import * as bluebird from "bluebird";
import { IDatabase, IMain, IOptions, TConfig } from "pg-promise";
import * as pgPromise from "pg-promise";
import * as redis from "redis";

bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

export const redisClient: redis.RedisClient = redis.createClient(
  "/var/run/redis/redis.sock"
);

const initOptions: IOptions<any> = {
  promiseLib: Promise
};

const config: TConfig = {
  host: "localhost",
  port: 5432,
  database: "roman",
  user: "roman",
  password: "roman"
};

export const pgp: IMain = pgPromise(initOptions);

export const pgDb: IDatabase<any> = pgp(config);
