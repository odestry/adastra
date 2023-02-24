import { createLogger, Logger } from 'vite'
import { prefixed } from 'adastra-cli-kit'
import { COLORS } from 'adastra-branding'

const logger = createLogger()

export const log = (logLevel: 'info' | 'warn' | 'error', msg: string): void => {
  switch (logLevel) {
    case 'warn':
      logger.warn(prefixed(msg, COLORS.warn))
      break
    case 'error':
      logger.error(prefixed(msg, COLORS.error))
      break
    default:
      logger.info(prefixed(msg))
  }
}

export const customLogger = (): Logger => ({
  ...logger,
  info: (msg: string) => {
    logger.clearScreen('info')
    log('info', msg)
  },
  warn: (msg: string) => {
    logger.clearScreen('warn')
    log('warn', msg)
  },
  error: (msg: string) => {
    logger.clearScreen('error')
    log('error', msg)
  }
})
