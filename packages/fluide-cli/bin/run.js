#!/usr/bin/env node

(async () => {
  const oclif = await import('@oclif/core')
  await oclif.execute({ type: 'esm', dir: import.meta.url })
})()
