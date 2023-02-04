import { describe, it, expect } from 'vitest'
import path from 'path'
import fs from 'fs/promises'

import fluideLiquidPlugin from '../src/plugins/vite-plugin-fluide-liquid'
import { resolveOptions } from '../src/options'

describe('fluide-plugin:liquid', () => {
  it('builds out .liquid files for development', async () => {
    const themeRoot = path.join('test', '__fixtures__')
    const options = resolveOptions({
      themeRoot,
      sourceCodeDir: path.join(themeRoot, 'src')
    })

    console.log(path.join(themeRoot, 'src'))

    const { configureServer } = fluideLiquidPlugin(options)

    // @ts-expect-error
    configureServer({
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
    })

    const tagsLiquid = await fs.readFile(
      path.join(__dirname, '__fixtures__', 'snippets', 'fluide.liquid'),
      { encoding: 'utf8' }
    )
    expect(tagsLiquid).toMatchSnapshot()
  })
})
