// src/logger.ts
import { blue, bold, dim, red, yellow } from "kleur/colors";
import { Writable } from "stream";
import { format as utilFormat } from "util";
var dt = new Intl.DateTimeFormat([], {
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit"
});
var defaultLogDestination = new Writable({
  objectMode: true,
  write(event, _, callback) {
    let dest = process.stderr;
    if (levels[event.level] < levels.error)
      dest = process.stdout;
    dest.write(dim(dt.format(new Date()) + " "));
    let type = event.type;
    if (type != null) {
      switch (event.level) {
        case "info":
          type = bold(blue(type));
          break;
        case "warn":
          type = bold(yellow(type));
          break;
        case "error":
          type = bold(red(type));
          break;
      }
      dest.write(`[${type}] `);
    }
    dest.write(utilFormat(...event.args));
    dest.write("\n");
    callback();
  }
});
var defaultLogLevel;
if (process.argv.includes("--verbose")) {
  defaultLogLevel = "debug";
} else if (process.argv.includes("--silent")) {
  defaultLogLevel = "silent";
} else {
  defaultLogLevel = "info";
}
var defaultLogOptions = {
  dest: defaultLogDestination,
  level: defaultLogLevel
};
var levels = {
  debug: 20,
  info: 30,
  warn: 40,
  error: 50,
  silent: 90
};
function log(opts = {}, level, type, ...args) {
  const logLevel = opts.level ?? defaultLogOptions.level;
  const dest = opts.dest ?? defaultLogOptions.dest;
  const event = {
    type,
    level,
    args,
    message: ""
  };
  if (levels[logLevel] > levels[level]) {
    return;
  }
  dest.write(event);
}
function debug(opts, type, ...messages) {
  return log(opts, "debug", type, ...messages);
}
function info(opts, type, ...messages) {
  return log(opts, "info", type, ...messages);
}
function warn(opts, type, ...messages) {
  return log(opts, "warn", type, ...messages);
}
function error(opts, type, ...messages) {
  return log(opts, "error", type, ...messages);
}
var logger = {
  debug: debug.bind(null, defaultLogOptions, "debug"),
  info: info.bind(null, defaultLogOptions, "info"),
  warn: warn.bind(null, defaultLogOptions, "warn"),
  error: error.bind(null, defaultLogOptions, "error")
};

export {
  defaultLogDestination,
  defaultLogLevel,
  defaultLogOptions,
  levels,
  log,
  debug,
  info,
  warn,
  error,
  logger
};
