#!/usr/bin/env node

// src/create-fluide.ts
var currentVersion = process.versions.node;
var requiredMajorVersion = parseInt(currentVersion.split(".")[0], 10);
var minimumMajorVersion = 14;
if (requiredMajorVersion < minimumMajorVersion) {
  console.error(`Node.js v${currentVersion} is out of date and unsupported!`);
  console.error(`Please use Node.js v${minimumMajorVersion} or higher.`);
  process.exit(1);
}
import("./index.js").then(({ main }) => main());
