// @ts-expect-error
import { Conf } from '@shopify/cli-kit/node/conf'

export interface ThemeConfSchema {
  themeStore: string
}

let _instance: Conf<ThemeConfSchema> | undefined

export default function themeConf (): any {
  // eslint-disable-next-line
  if (!_instance) {
    _instance = new Conf<ThemeConfSchema>({ projectName: 'shopify-cli-theme-conf' })
  }
  return _instance
}
