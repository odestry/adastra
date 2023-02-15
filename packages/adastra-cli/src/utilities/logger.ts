import moment from 'moment'
import color from 'chalk'
import { createLogger, LogOptions, Logger } from 'vite'
import { brand } from 'adastra-cli-kit'

const logger = createLogger()

export const log = (logLevel: 'info' | 'warn' | 'error', msg: string): void => {
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

  logger.info(message())
}

export const customLogger = (): Logger => ({
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

export const startDevMessage = (): void => {
  logger.clearScreen('info')
  log(
    'info',
    color.hex(brand.colors.yellowgreen)(`Initiating launch sequence...`)
  )
}
