import { Command } from '@oclif/core'

type FlagValues = {
  [key: string]: boolean | string | string[] | number | undefined
}

export default abstract class BaseCommand extends Command {
  passThroughFlags(flags: FlagValues): string[] {
    const passThroughFlags: string[] = []
    for (const [label, value] of Object.entries(flags)) {
      if (typeof value === 'boolean') {
        if (value) passThroughFlags.push(`--${label}`)
      } else if (Array.isArray(value)) {
        value.forEach(element =>
          passThroughFlags.push(`--${label}`, `${element}`)
        )
      } else {
        passThroughFlags.push(`--${label}`, `${value}`)
      }
    }
    return passThroughFlags
  }
}
