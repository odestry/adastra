// src/utils.ts
var sleep = async (ms) => await new Promise((resolve) => setTimeout(resolve, ms));
var random = (...arr) => {
  arr = arr.flat(1);
  return arr[Math.floor(arr.length * Math.random())];
};

export {
  sleep,
  random
};
