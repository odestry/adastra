import ThemeCommand from './theme-command.js'
import themeFlags from './theme-flags.js'
import ensureThemeStore from './theme-store.js'
import {
  removeDevelopmentTheme,
  setDevelopmentTheme,
  getDevelopmentTheme
} from './local-storage.js'

import { DevelopmentThemeManager } from './development-theme-manager.js'

import { customLogger, log, startDevMessage } from './logger.js'

export {
  ThemeCommand,
  themeFlags,
  customLogger,
  log,
  startDevMessage,
  getDevelopmentTheme,
  setDevelopmentTheme,
  removeDevelopmentTheme,
  DevelopmentThemeManager,
  ensureThemeStore
}
