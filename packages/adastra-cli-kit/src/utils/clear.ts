import { erase, cursor } from 'sisteransi'

export const strip = (str: string): string => {
  const pattern = [
    '[\\u001B\\u009B][[\\]()#;?]*(?:(?:(?:(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]+)*|[a-zA-Z\\d]+(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]*)*)?\\u0007)',
    '(?:(?:\\d{1,4}(?:;\\d{0,4})*)?[\\dA-PRZcf-ntqry=><~]))'
  ].join('|')

  const RGX = new RegExp(pattern, 'g')
  return typeof str === 'string' ? str.replace(RGX, '') : str
}

export const breakIntoWords = (str: string): string[] => {
  const wordRE = /\b(\w+)\b/g
  const parts = []
  let match
  let lastIndex = 0
  while ((match = wordRE.exec(str)) != null) {
    const index = match.index
    parts.push(str.slice(lastIndex, index))
    lastIndex = index
  }
  parts.push(str.slice(lastIndex))
  return parts
}

export const wrap = (
  str: string,
  indent = '',
  max = process.stdout.columns
): string => {
  const words = breakIntoWords(str)
  let i = 0
  const lines = []
  for (const raw of words) {
    const len = strip(raw).length
    if (i + len > max) {
      i = 0
      lines.push('\n' + indent, raw)
    } else {
      lines.push(raw)
    }
    i += len
  }
  return lines.join('')
}

export interface Part {
  raw: string
  prefix: string
  text: string
  words: string[]
}

export const split = (str: string): Part[] => {
  const pattern = [
    '[\\u001B\\u009B][[\\]()#;?]*(?:(?:(?:(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]+)*|[a-zA-Z\\d]+(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]*)*)?\\u0007)',
    '(?:(?:\\d{1,4}(?:;\\d{0,4})*)?[\\dA-PRZcf-ntqry=><~]))'
  ].join('|')

  const ansiRE = new RegExp(pattern, 'g')
  const parts: Part[] = []
  let match
  let lastIndex = 0

  const push = (index = Infinity): void => {
    const raw = str.slice(lastIndex, index)
    const text = strip(raw)
    const prefix = raw.slice(0, raw.length - text.length)
    parts.push({ raw, prefix, text, words: breakIntoWords(text) })
  }
  while ((match = ansiRE.exec(str)) != null) {
    const index = match.index
    push(index)
    lastIndex = index
  }
  push()

  return parts
}

export const lines = (msg: string, perLine: number): number => {
  const lines = String(strip(msg).length > 0 || '').split(/\r?\n/)

  if (!perLine) return lines.length
  return lines.map(l => Math.ceil(l.length / perLine)).reduce((a, b) => a + b)
}

export default function (prompt: string, perLine: number): string {
  if (!perLine) return erase.line + cursor.to(0)

  let rows = 0
  const lines = prompt.split(/\r?\n/)
  for (const line of lines) {
    rows += 1 + Math.floor(Math.max(strip(line).length - 1, 0) / perLine)
  }

  return erase.lines(rows)
}
