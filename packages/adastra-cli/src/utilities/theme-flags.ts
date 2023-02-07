import { Flags } from '@oclif/core'
// @ts-expect-error
import { normalizeStoreFqdn } from '@shopify/cli-kit/node/context/fqdn'
// @ts-expect-error
import { resolvePath } from '@shopify/cli-kit/node/path'

const themeFlags = {
  path: Flags.string({
    hidden: false,
    description: 'The path to your theme directory.',
    parse: async (input, _) => await Promise.resolve(resolvePath(input)),
    env: 'SHOPIFY_FLAG_PATH',
    default: '.'
  }),
  password: Flags.string({
    hidden: false,
    description: 'Password generated from the Theme Access app.',
    env: 'SHOPIFY_CLI_THEME_TOKEN'
  }),
  store: Flags.string({
    char: 's',
    description:
      'Store URL. It can be the store prefix (johns-apparel)' +
      ' or the full myshopify.com URL (johns-apparel.myshopify.com, https://johns-apparel.myshopify.com).',
    env: 'SHOPIFY_FLAG_STORE',
    parse: async (input, _) => await Promise.resolve(normalizeStoreFqdn(input))
  })
}

export default themeFlags
