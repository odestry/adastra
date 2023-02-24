import path from 'path'
import fs from 'fs/promises'
import { describe, expect, it } from 'vitest'
import { build } from 'vite'

import adastra from '../src'

describe('adastra-plugin:build', () => {
  const root = path.join('test', '__fixtures__')
  it('builds out adastra.liquid snippet file for production', async () => {
    await build({
      logLevel: 'silent',
      plugins: [
        adastra({
          root,
          sourceDir: path.join(root, 'src')
        })
      ]
    })

    const tagsLiquid = await fs.readFile(
      path.join(__dirname, '__fixtures__', 'snippets', 'adastra.liquid'),
      { encoding: 'utf8' }
    )
    expect(tagsLiquid).toMatchSnapshot()
  })

  it('builds out adastra.liquid snippet file with hashing', async () => {
    await build({
      logLevel: 'silent',
      plugins: [
        adastra({
          root,
          sourceDir: path.join(root, 'src'),
          hash: true,
          minify: false
        })
      ]
    })

    const tagsLiquid = await fs.readFile(
      path.join(__dirname, '__fixtures__', 'snippets', 'adastra.liquid'),
      { encoding: 'utf8' }
    )
    expect(tagsLiquid).toMatchSnapshot()
  })

  it('builds out adastra.liquid snippet file with custom source folder', async () => {
    await build({
      logLevel: 'silent',
      plugins: [
        adastra({
          root,
          sourceDir: path.join(root, 'frontend')
        })
      ]
    })

    const tagsLiquid = await fs.readFile(
      path.join(__dirname, '__fixtures__', 'snippets', 'adastra.liquid'),
      { encoding: 'utf8' }
    )
    expect(tagsLiquid).toMatchSnapshot()
  })
})
