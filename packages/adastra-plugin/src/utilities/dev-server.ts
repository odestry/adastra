import { AddressInfo } from 'net'
import { ResolvedConfig } from 'vite'
import { DevServerUrl } from '../types'

/**
 * Resolve the dev server URL from the server address and configuration.
 */
export function resolveDevServerUrl(
  address: AddressInfo,
  config: ResolvedConfig
): DevServerUrl {
  const configHmr = config.server.hmr
  const configHmrProtocol =
    typeof configHmr === 'object' ? configHmr.protocol : null
  const configHmrHost = typeof configHmr === 'object' ? configHmr.host : null
  const configHmrClientPort =
    typeof configHmr === 'object' ? configHmr.clientPort : null
  const configHost =
    typeof config.server.host === 'string' ? config.server.host : null

  const clientProtocol = configHmrProtocol === 'wss' ? 'https' : 'http'
  const serverProtocol = config.server.https !== false ? 'https' : 'http'
  const protocol = clientProtocol ?? serverProtocol

  const serverAddress = isIpv6(address)
    ? `[${address.address}]`
    : address.address
  const host = configHmrHost ?? configHost ?? serverAddress

  const port = configHmrClientPort ?? address.port

  return `${protocol}://${host}:${port}`
}

/**
 * Check if the address is IPv6.
 */
export function isIpv6(address: AddressInfo): boolean {
  return (
    address.family === 'IPv6' ||
    // In node >=18.0 <18.4 this was an integer value. This was changed in a minor version.
    // See: https://github.com/laravel/vite-plugin/issues/103
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error-next-line
    address.family === 6
  )
}
