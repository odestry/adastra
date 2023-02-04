import path from 'path'
import fs from 'fs/promises'
import { describe, expect, it } from 'vitest'
import { build } from 'vite'

import fluide from '../src'

describe('fluide:build', () => {
  const themeRoot = path.join('test', '__fixtures__')
  it('builds out fluide.liquid snippet file for production', async () => {
    await build({
      logLevel: 'silent',
      plugins: [
        fluide({
          themeRoot,
          sourceCodeDir: path.join(themeRoot, 'src')
        })
      ]
    })

    const tagsLiquid = await fs.readFile(
      path.join(__dirname, '__fixtures__', 'snippets', 'fluide.liquid'),
      { encoding: 'utf8' }
    )
    expect(tagsLiquid).toMatchSnapshot()
  })

  it('builds out fluide.liquid snippet file with hashing', async () => {
    await build({
      logLevel: 'silent',
      plugins: [
        fluide({
          themeRoot,
          sourceCodeDir: path.join(themeRoot, 'src'),
          hash: true,
          minify: false
        })
      ]
    })

    const tagsLiquid = await fs.readFile(
      path.join(__dirname, '__fixtures__', 'snippets', 'fluide.liquid'),
      { encoding: 'utf8' }
    )
    expect(tagsLiquid).toMatchSnapshot()
  })
})
