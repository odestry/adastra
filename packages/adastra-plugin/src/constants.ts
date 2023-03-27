// Array of known CSS file extensions
export const KNOWN_CSS_EXTENSIONS = [
  'css',
  'less',
  'sass',
  'scss',
  'styl',
  'stylus',
  'pcss',
  'postcss'
]

// Array of known JSX file extensions
export const KNOWN_JSX_EXTENSIONS = ['jsx', 'tsx']

// Regular expression to match CSS file extensions
export const CSS_EXTENSIONS_REGEX = new RegExp(
  `\\.(${KNOWN_CSS_EXTENSIONS.join('|')})(\\?.+)?$`
)

// Path to the Vite client script
export const CLIENT_SCRIPT_PATH = '@vite/client'

// Path to the React Refresh runtime
export const CLIENT_REACT_REFRESH_PATH = '@react-refresh'
