import moment from 'moment'
import { brand, label } from '@fluide/cli-kit'
import color from 'chalk'
import { createLogger, LogOptions, Logger } from 'vite'

const logger = createLogger()

export const log = (
  logLevel: 'info' | 'warn' | 'error',
  msg: string,
  logger = console
): void => {
  const message = (currentColor: string = brand.colors.yellowgreen): string =>
    `${color.white(moment().format('hh:mm:ss'))} ${color
      .hex(currentColor)
      .bold(`[Fluide]`)} ${msg}`

  switch (logLevel) {
    case 'warn':
      logger.warn(message(brand.colors.warn))
      break
    case 'error':
      logger.error(message(brand.colors.error))
      break
  }

  if (logger.log !== undefined) {
    logger.log(message())
  } else {
    logger.info(message())
  }
}

export const printUrls = (
  baseUrl: string,
  logger = console.log,
  host: string = 'localhost',
  port: number = 9292
): void => {
  const devUrl = `http://${host}:${port}`
  const editingUrl = `https://${baseUrl}/admin/themes/editor`
  const previewUrl = `https://${baseUrl}/preview_theme_id=pb=0`
  const stopServerMessage = '(Use Ctrl-C to stop server)'
  logger(
    `${' '.repeat(2)}${color.white(
      'Please open this URL and refresh your browser'
    )}
  ${color.hex(brand.colors.yellowgreen)(devUrl)}\n
  ${color.white(
    "Customize this theme in the Theme Editor, and use 'fluide sync'\n  to get the latest changes"
  )}
  ${color.hex(brand.colors.yellowgreen)(editingUrl)}\n
  ${color.white('Share this theme preview with other some cool')}
  ${color.hex(brand.colors.yellowgreen)(previewUrl)}\n
  ${stopServerMessage}\n`
  )
}

export const printOtherUrls = (baseUrl: string, logger = console.log): void => {
  const editingUrl = `https://${baseUrl}/admin/themes/editor`
  const previewUrl = `https://${baseUrl}/preview_theme_id=pb=0`
  const stopServerMessage = '(Use Ctrl-C to stop server)'
  logger(
    `${' '.repeat(2)}${color.white(
      "Customize this theme in the Theme Editor, and use 'fluide sync'\n  to get the latest changes"
    )}
  ${color.hex(brand.colors.yellowgreen)(editingUrl)}\n
  ${color.white('Share this theme preview with other some cool')}
  ${color.hex(brand.colors.yellowgreen)(previewUrl)}\n
  ${stopServerMessage}\n`
  )
}

export const logInitiateSequence = (
  baseUrl: string,
  logger = console.log
): void => {
  logger(
    `${' '.repeat(3)}${label('Fluide')} ${color.hex(brand.colors.yellowgreen)(
      `Initiating launch sequence for ${baseUrl} \n`
    )}`
  )
}

export const startDevMessage = (
  baseUrl: string,
  logger = console.log,
  clearScreen: () => void = console.clear
): void => {
  clearScreen()
  logger(
    `${' '.repeat(2)}${label('Fluide')} ${color.hex(brand.colors.yellowgreen)(
      `Initiating launch sequence for ${baseUrl.replace(
        '.myshopify.com',
        ''
      )} store\n`
    )}`
  )
}

export const customLogger = (store: string): Logger => ({
  ...logger,
  info: (msg: string, options?: LogOptions) => {
    logger.clearScreen('info')
    printOtherUrls(store, logger.info)
    log('info', msg)
  },
  warn: (msg: string, options?: LogOptions) => {
    logger.clearScreen('warn')
    log('warn', msg)
  },
  error: (msg: string, options?: LogOptions) => {
    logger.clearScreen('error')
    log('error', msg)
  }
})
