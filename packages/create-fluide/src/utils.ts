export const sleep = async (ms: number): Promise<number> =>
  await new Promise((resolve) => setTimeout(resolve, ms));

export const random = (...arr: any[]): any => {
  arr = arr.flat(1);
  return arr[Math.floor(arr.length * Math.random())];
};
