import moment from 'moment'
import color from 'chalk'
import { createLogger, LogOptions, Logger } from 'vite'
import { brand, label } from 'adastra-cli-kit'

const logger = createLogger()

export const log = (
  logLevel: 'info' | 'warn' | 'error',
  msg: string,
  logger = console
): void => {
  const message = (currentColor: string = brand.colors.yellowgreen): string =>
    `${color.white(moment().format('hh:mm:ss'))} ${color
      .hex(currentColor)
      .bold(`[adastra]`)} ${msg}`

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

export const logInitiateSequence = (
  baseUrl: string,
  logger = console.log
): void => {
  logger(
    `${' '.repeat(3)}${label('Adastra')} ${color.hex(brand.colors.yellowgreen)(
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
    `${' '.repeat(2)}${label('Adastra')} ${color.hex(brand.colors.yellowgreen)(
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
