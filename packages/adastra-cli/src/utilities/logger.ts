import { createLogger, LogOptions, Logger } from 'vite'
import { prefixed } from 'adastra-cli-kit'
import { COLORS } from 'adastra-branding'

const logger = createLogger()

export const log = (logLevel: 'info' | 'warn' | 'error', msg: string): void => {
  switch (logLevel) {
    case 'warn':
      logger.warn(prefixed(COLORS.warn, msg))
      break
    case 'error':
      logger.error(prefixed(COLORS.error, msg))
      break
  }

  logger.info(prefixed(msg))
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
