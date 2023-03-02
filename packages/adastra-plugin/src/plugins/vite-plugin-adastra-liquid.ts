import fs from 'fs'
import path from 'path'
import createDebugger from 'debug'
import { Manifest, Plugin, ResolvedConfig, normalizePath } from 'vite'

import {
  disableThemeCheckTag,
  adastraTagDisclaimer,
  adastraTagEntryPath,
  adastraTagSnippetDev,
  stylesheetTag,
  scriptTag,
  preloadScriptTag,
  adastraEntryTag
} from '../utilities'
import { CSS_EXTENSIONS_REGEX } from '../constants'
import type { ResolvedAdastraPluginOptions } from '../types'

const debug = createDebugger(`adastra-plugin:liquid`)

// Plugin for generating adastra tag liquid theme snippet with entry points for JS and CSS assets
export default (options: ResolvedAdastraPluginOptions): Plugin => {
  let config: ResolvedConfig

  const adastraSnippetPath = path.resolve(
    options.root,
    `snippets/${options.snippetName}.liquid`
  )

  return {
    name: `adastra-plugin-liquid`,
    enforce: 'post',
    configResolved(resolvedConfig) {
      // Store reference to resolved config
      config = resolvedConfig
    },
    configureServer({ config, middlewares }) {
      const protocol = config.server?.https === true ? 'https:' : 'http:'
      const host =
        typeof config.server?.host === 'string'
          ? config.server.host
          : 'localhost'
      const port =
        typeof config.server?.port !== 'undefined' ? config.server.port : 5173

      const assetHost =
        typeof config.server?.origin === 'string'
          ? config.server.origin
          : `${protocol}//${host}:${port}`

      debug({ assetHost })

      const adastraTagSnippetContent =
        disableThemeCheckTag +
        adastraTagDisclaimer +
        adastraTagEntryPath(
          config.resolve.alias,
          options.entrypointsDir,
          options.snippetName
        ) +
        adastraTagSnippetDev(assetHost, options.entrypointsDir)

      // Write adastra tag snippet for development server
      fs.writeFileSync(adastraSnippetPath, adastraTagSnippetContent)

      return () =>
        middlewares.use((req, res, next) => {
          if (req.url === '/index.html') {
            res.statusCode = 404

            res.end(
              fs.readFileSync(path.join(__dirname, 'dev-index.html')).toString()
            )
          }

          next()
        })
    },
    closeBundle() {
      const manifestFilePath = path.resolve(
        options.root,
        `assets/adastra.manifest.json`
      )

      if (!fs.existsSync(manifestFilePath)) {
        return
      }

      const assetTags: string[] = []
      const manifest = JSON.parse(
        fs.readFileSync(manifestFilePath, 'utf8')
      ) as Manifest

      Object.keys(manifest).forEach(src => {
        const { file, isEntry, css, imports } = manifest[src]
        const ext = path.extname(src)

        // Generate tags for JS and CSS entry points
        if (isEntry === true) {
          const entryName = normalizePath(
            path.relative(options.entrypointsDir, src)
          )
          const entryPaths = [`/${src}`, entryName]
          const tagsForEntry = []

          if (ext.match(CSS_EXTENSIONS_REGEX) !== null) {
            // Render style tag for CSS entry
            tagsForEntry.push(stylesheetTag(file))
          } else {
            // Render preload tags for JS entry
            tagsForEntry.push(preloadScriptTag(file))

            // Render script tag for JS entry
            tagsForEntry.push(scriptTag(file))

            if (typeof css !== 'undefined' && css.length > 0) {
              css.forEach((cssFileName: string) => {
                // Render style tag for imported CSS file
                tagsForEntry.push(stylesheetTag(cssFileName))
              })
            }

            if (typeof imports !== 'undefined' && imports.length > 0) {
              imports.forEach((importFilename: string) => {
                const chunk = manifest[importFilename]
                const { css } = chunk
                // Render preload tags for JS imports
                tagsForEntry.push(preloadScriptTag(chunk.file))

                // Render style tag for JS imports
                if (typeof css !== 'undefined' && css.length > 0) {
                  css.forEach((cssFileName: string) => {
                    // Render style tag for imported CSS file
                    tagsForEntry.push(stylesheetTag(cssFileName))
                  })
                }
              })
            }
          }

          assetTags.push(
            adastraEntryTag(
              entryPaths,
              tagsForEntry.join('\n  '),
              assetTags.length === 0
            )
          )
        }

        // Generate entry tag for bundled "style.css" file when cssCodeSplit is false
        if (src === 'style.css' && !config.build.cssCodeSplit) {
          assetTags.push(adastraEntryTag([src], stylesheetTag(file), false))
        }
      })

      const adastraTagSnippetContent =
        disableThemeCheckTag +
        adastraTagDisclaimer +
        adastraTagEntryPath(
          config.resolve.alias,
          options.entrypointsDir,
          options.snippetName
        ) +
        assetTags.join('\n') +
        '\n{% endif %}\n'

      // Write adastra tag snippet for production build
      fs.writeFileSync(adastraSnippetPath, adastraTagSnippetContent)
    }
  }
}
