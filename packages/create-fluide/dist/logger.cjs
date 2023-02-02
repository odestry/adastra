"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/logger.ts
var logger_exports = {};
__export(logger_exports, {
  debug: () => debug,
  defaultLogDestination: () => defaultLogDestination,
  defaultLogLevel: () => defaultLogLevel,
  defaultLogOptions: () => defaultLogOptions,
  error: () => error,
  info: () => info,
  levels: () => levels,
  log: () => log,
  logger: () => logger,
  warn: () => warn
});
module.exports = __toCommonJS(logger_exports);
var import_colors = require("kleur/colors");
var import_stream = require("stream");
var import_util = require("util");
var dt = new Intl.DateTimeFormat([], {
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit"
});
var defaultLogDestination = new import_stream.Writable({
  objectMode: true,
  write(event, _, callback) {
    let dest = process.stderr;
    if (levels[event.level] < levels.error)
      dest = process.stdout;
    dest.write((0, import_colors.dim)(dt.format(new Date()) + " "));
    let type = event.type;
    if (type != null) {
      switch (event.level) {
        case "info":
          type = (0, import_colors.bold)((0, import_colors.blue)(type));
          break;
        case "warn":
          type = (0, import_colors.bold)((0, import_colors.yellow)(type));
          break;
        case "error":
          type = (0, import_colors.bold)((0, import_colors.red)(type));
          break;
      }
      dest.write(`[${type}] `);
    }
    dest.write((0, import_util.format)(...event.args));
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  debug,
  defaultLogDestination,
  defaultLogLevel,
  defaultLogOptions,
  error,
  info,
  levels,
  log,
  logger,
  warn
});
