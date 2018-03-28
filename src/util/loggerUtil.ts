import pino = require("pino");

const pretty = pino.pretty();

pretty.pipe(process.stdout);

const logger = pino(
  {
    // name: "app",
    safe: true,
    timestamp: false
  },
  pretty
);

export function logInfo(title: string, message: any = ""): void {
  if (isDev) {
    logger.info(title, message);
  }
}

function isDev(): boolean {
  return process.env.NODE_ENV !== "production";
}
