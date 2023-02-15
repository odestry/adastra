import themeFlags from './theme-flags'
import { getThemeStore, setThemeStore } from './local-storage'
// @ts-expect-error
import { AbortError } from '@shopify/cli-kit/node/error'
// @ts-expect-error
import { outputContent, outputToken } from '@shopify/cli-kit/node/output'

export default function ensureThemeStore(flags: {
  store: string | undefined
}): string {
  const store = flags.store || getThemeStore()
  if (!store) {
    throw new AbortError(
      'A store is required',
      `Specify the store passing ${
        outputContent`${outputToken.genericShellCommand(
          `--${themeFlags.store.name}={your_store_url}`
        )}`.value
      } or set the ${
        outputContent`${outputToken.genericShellCommand(
          themeFlags.store.env as string
        )}`.value
      } environment variable.`
    )
  }
  setThemeStore(store)
  return store
}
