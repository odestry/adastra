import path from 'node:path'

/** @type {import('vite').UserConfig} */
export default {
  server: {
    host: 'localhost',
    https: false
  },
  resolve: {
    alias: [
      {
        find: '~',
        replacement: path.posix.join(__dirname, 'src')
      },
      {
        find: '@',
        replacement: path.posix.join(__dirname, 'src')
      },
      {
        find: '@@',
        replacement: path.posix.join(__dirname, 'modules', 'js')
      }
    ]
  }
}
