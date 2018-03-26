import * as bluebird from "bluebird";
import { IDatabase, IMain, IOptions, TConfig } from "pg-promise";
import * as pgPromise from "pg-promise";
import * as redis from "redis";

bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

export function init(): IDatabaseClients {
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

  const pgpMain: IMain = pgPromise(initOptions);

  const pgpDb: IDatabase<any> = pgpMain(config);

  const redisClient: redis.RedisClient = redis.createClient(
    "/var/run/redis/redis.sock"
  );

  return { pgpMain, pgpDb, redisClient };
}

export interface IDatabaseClients {
  readonly pgpMain: IMain;
  readonly pgpDb: IDatabase<any>;
  readonly redisClient: redis.RedisClient;
}
