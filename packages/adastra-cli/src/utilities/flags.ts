import { Flags } from '@oclif/core'
// @ts-expect-error @todo
import { normalizeStoreFqdn } from '@shopify/cli-kit/node/context/fqdn'
// @ts-expect-error @todo
import { resolvePath } from '@shopify/cli-kit/node/path'

export const globalFlags = {
  environment: Flags.string({
    hidden: true,
    description: 'The environment to apply to the current command.',
    env: 'SHOPIFY_FLAG_ENVIRONMENT'
  }),
  verbose: Flags.boolean({
    hidden: false,
    description: 'Increase the verbosity of the logs.',
    env: 'SHOPIFY_FLAG_VERBOSE'
  })
}

export const themeFlags = {
  path: Flags.string({
    hidden: false,
    description: 'The path to your theme directory.',
    // eslint-disable-next-line
    parse: (input, _) => Promise.resolve(resolvePath(input)),
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
    // eslint-disable-next-line
    parse: (input, _) => Promise.resolve(normalizeStoreFqdn(input))
  })
}
