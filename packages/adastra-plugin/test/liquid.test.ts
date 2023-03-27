import { describe, it, expect } from 'vitest'
import path from 'path'
import fs from 'fs/promises'

import adastraLiquidPlugin from '../src/plugins/vite-plugin-adastra-liquid'
import { resolveOptions } from '../src/options'

describe('adastra-plugin:liquid', () => {
  it('builds out .liquid files for development', async () => {
    const root = path.join('test', '__fixtures__')
    const options = resolveOptions({
      root,
      sourceDir: path.join(root, 'src')
    })

    const { configureServer } = adastraLiquidPlugin(options)

    const serverConfig = {
      config: {
        resolve: {
          alias: [
            {
              find: '~',
              replacement: path.posix.join(__dirname, 'src')
            },
            {
              find: '@',
              replacement: path.posix.join(__dirname, 'src')
            }
          ]
        }
      }
    }

    // @ts-expect-error @todo fix typescript error
    configureServer(serverConfig)

    const snippetPath = path.join(
      __dirname,
      '__fixtures__',
      'snippets',
      'adastra.liquid'
    )
    const tagsLiquid = await fs.readFile(snippetPath, { encoding: 'utf8' })
    expect(tagsLiquid).toMatchSnapshot()
  })
})
