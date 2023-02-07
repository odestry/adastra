import { describe, it, assert } from 'vitest'
import { BRAND } from '../src'

describe('skipped suite', () => {
  it('test', () => {
    assert.equal(BRAND.author, 'Blanklob')
  })
})
