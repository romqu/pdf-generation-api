import { ClientSessionEntity } from "./data/client_session/clientSessionEntity";
import { ClientSessionRepo } from "./data/client_session/clientSessionRepo";
import { MemoryDataSource } from "./data/memoryDataSource";
import { redisClient } from "./database";
import { logger } from "./util/loggerUtil";

async function test(): Promise<any> {
  const s = new MemoryDataSource(redisClient);
  const repo = new ClientSessionRepo(s);

  const result = await repo.insert({
    value: new ClientSessionEntity("null", 1, "undefined")
  });

  // const result = await repo.get({ key: "test" });

  const r = result.isSuccess ? result.data : result;

  logger.info("RESULT:", r);
}

test();
