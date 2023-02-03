import { nouns, adjectives } from "./words.js";
import { random } from "../utils.js";

export const generateProjectName = (): string => {
  const adjective = random(adjectives) as string;
  const validNouns = nouns.filter((n) => n[0] === adjective[0]);
  const noun = random(validNouns.length > 0 ? validNouns : nouns) as string;
  return `${adjective}-${noun}`;
};
