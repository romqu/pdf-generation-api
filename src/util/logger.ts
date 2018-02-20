import pino = require("pino");

const pretty = pino.pretty();

pretty.pipe(process.stdout);

export const logger = pino(
  {
    // name: "app",
    safe: true,
    timestamp: false
  },
  pretty
);
