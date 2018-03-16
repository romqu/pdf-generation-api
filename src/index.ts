import { ClientSessionRepo } from "./data/client_session/clientSessionRepo";
import { MemoryDataSource } from "./data/memoryDataSource";
import { redisClient } from "./database";
import { logger } from "./util/loggerUtil";

async function test(): Promise<any> {
  const s = new MemoryDataSource(redisClient);
  const repo = new ClientSessionRepo(s);

  // const result = await repo.insert({
  //   value: new ClientSessionEntity("11111", 1, "1111111")
  // });

  const result = await repo.get({ key: "1111" });

  const r = result.isSuccess ? result.data : result.error.value.stack;

  logger.info("RESULT:", r);
}

test();
