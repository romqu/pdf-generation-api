import { MemoryDataSource } from "./data/memoryDataSource";
import { redisClient } from "./database";

async function test(): Promise<any> {
  const s = new MemoryDataSource(redisClient);
}

test();
