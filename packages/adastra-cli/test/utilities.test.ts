import { describe, expect, it } from 'vitest'
import detectURLs from '../src/utilities/detect-urls'

describe('adastra-cli:utils', () => {
  it('gets urls from stdout', () => {
    const urls = `Please open this URL in your browser:
    http://127.0.0.1:9292
    Customize this theme in the Theme Editor, and use 'theme pull' to get the changes:
    https://example.myshopify.com/admin/themes/127782584373/editor
    Share this theme preview:
    https://example.myshopify.com/?preview_theme_id=127782584373
    `

    const [localDevURL, editorURL, previewURL] = detectURLs(urls) as string[]

    expect(localDevURL).toBe('http://127.0.0.1:9292')

    expect(editorURL).toBe(
      'https://example.myshopify.com/admin/themes/127782584373/editor'
    )

    expect(previewURL).toBe(
      'https://example.myshopify.com/?preview_theme_id=127782584373'
    )
  })
})
