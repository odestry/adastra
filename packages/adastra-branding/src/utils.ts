import { get } from 'node:https'
import { nouns, adjectives } from './config/words'

export const getLatestVersion = async (): Promise<string> => {
  let v = ''
  return await new Promise<string>(resolve => {
    if (v.length > 0) return resolve(v)
    get('https://registry.npmjs.org/astro/latest', res => {
      let body = ''
      res.on('data', chunk => (body += chunk))
      res.on('end', () => {
        const { version } = JSON.parse(body)
        v = version
        resolve(version)
      })
    })
  })
}

export const random = (...arr: any[]): any => {
  arr = arr.flat(1)
  return arr[Math.floor(arr.length * Math.random())]
}

export const generateName = (): string => {
  const adjective = random(adjectives) as string
  const validNouns = nouns.filter(noun => noun[0] === adjective[0])
  const noun = random(validNouns.length > 0 ? validNouns : nouns) as string
  return `${adjective}-${noun}`
}
