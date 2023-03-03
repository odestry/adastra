# adastra-plugin

Adastra ✨ plugin is package that aims to integrate [Vite](https://vitejs.dev) as seamlessly as possible with Shopify themes to optimize your theme development experience.

## Requirements

Please make sure you have Node.js >=16 and NPM are installed before running Vite:

- NodeJS >= 16 ([Install NodeJS LTS](https://nodejs.org/))
- Make sure you also have ([Shopify CLI for themes](https://shopify.dev/docs/themes/tools/cli/install)) to launch the Shopify theme development server.

## Installation

1. Run the following command to initialize a Node project inside the root of your theme's directory:

```bash
npm init -y
```

2. Next, install Vite and the Adastra ✨ plugin.

```bash
npm install -D vite adastra-plugin

# Using Yarn/PNPM

yarn add --dev vite adastra-plugin
# pnpm add -D vite adastra-plugin
```

Finally, adjust your `package.json` by adding the following scripts:

```json
"description": "",
"scripts": {
  - "test": "echo \"Error: no test specified\" && exit 1",
  "dev": "vite",
  "build": "vite build",
  "dev:shopify": "shopify theme dev"
},
```

## Usage

Create a `vite.config.{js,ts}` file in your theme root directory and add the `adastra-plugin`. You are free to customize this file based on your needs, check Vite's [plugins](https://vitejs.dev/plugins/) and [config reference](https://vitejs.dev/config/) for more info.

```js
import { defineConfig } from 'vite'
import adastra from 'adastra-plugin'

export default defineConfig({
  plugins: [
    adastra({
      // Root path to your Shopify theme directory (location of snippets, sections, templates, etc.)
      root: './',
      // Frontend source code directory
      sourceDir: 'src',
      // Frontend entry points directory
      entrypointsDir: 'src/entrypoints',
      // The name of the genarated snippet adastra.liquid snippet.
      snippetName: 'adastra'
    })
  ]
})
```

The Adastra ✨ Vite Plugin does not require you to specify the entrypoints for your theme. By default, it treats JavaScript and CSS files (including preprocessed
languages such as TypeScript, JSX, TSX, and Sass) within the `src/entrypoints` folder in the root of your project as entry points for Vite.

```bash
/
└── src/
  └── entrypoints/
    ├── base.scss
    ├── customer.css
    └── theme.js
```

Your final theme project structure should look like something like this:

```shell
/
├── assets
├── config
├── layout
├── locales
├── sections
├── snippets/
├── src/  # Source directory (name can be changed in vite.config.js)
│   └── entrypoints/ # Entrypoints directory (name can be changed in vite.config.js)
│       ├── base.scss
│       ├── customer.css
│       └── theme.js
├── templates
├── vite.config.js
└── package.json
```

If you use Typescript make sure you setup and `tsconfig.json` file in the root of the project, check out an example [here](https://github.com/blanklob/adastra/blob/main/packages/tsconfig/theme.json).

## How it works?

Adastra plugin ✨ detects entrypoint files automatically in the `entrypoints/` directory. In this case `base.scss` and `customer.css` for styles and `theme.js` for scripts/modules.

So everything you import to these three files will be shipped to the theme `assets` folder when building for production.

You can create other folders like `src/utils/` if you want, or a `src/components/` folder for Native/React/Vue/Lit/Preact components. Only the files/modules imported in the entrypoint files will be served by Vite.

Any static assets, like custom fonts, manifest files, `.css.liquid` or `.js.liquid`, can be placed inside the `assets` theme folder, just make sure to add the configuration below to avoid clearing the assets directory when building for production.

```js
// vite.config.js

import { defineConfig } from 'vite'
import adastra from 'adastra-plugin'

export default defineConfig({
  plugins: [adastra()],
  build: {
    emptyOutDir: false
  }
})
```

### loading modules and styles to your theme

Adastra Vite Plugin generates an `adastra.liquid` snippet which includes `<script>` and `<link>` tags, and all the liquid logic needed to load your static assets.

With your Vite entry points configured, you only need to reference them with the `adastra` snippet that you add to the `<head>` of your theme's layout:

```liquid
{% liquid
  # Relative to entrypointsDir
  render 'adastra with 'base.scss'
  render 'adastra with 'theme.js'

  if request.page_type contains 'customers/'
    render 'adastra' with 'customers.css'
  endif
%}
```

During development, the `adastra` will load your assets from the Vite development server and inject the Vite client to enable Hot Module Replacement.
In build mode, the snippet will load your compiled and versioned assets, including any imported CSS, and use the `asset_url` filter to serve your assets
from the Shopify content delivery network (CDN).

#### Preloading stylesheets

You can pass the `preload` variable to the `adastra` snippet to enable the `preload` parameter of the `stylesheet_tag` filter. Use it sparingly. For example, consider preloading only render-blocking stylesheets.
[Learn more](https://shopify.dev/themes/best-practices/performance#use-resource-hints-to-preload-key-resources).

```liquid
{% render 'adastra' with 'base.scss', preload: true %}
```

### Import aliases

For convenience, `~/` and `@/` are aliased to your `src` folder, which simplifies imports:

```js
import ProductForm from '@/components/ProductForm.vue'
import Quiz from '@/components/Quiz.jsx'
import '@/styles/utils.css'
```

## Advanced Customization

Out of the box, the Shopify Vite Plugin uses sensible conventions to help you add Vite with zero configuration to existing Shopify themes; however, sometimes you may need to customize the Plugin's behavior.

Every configuration option is described in the [Configuration Reference](https://shopify-vite.barrelny.com/guide/configuration.html).

## Special Thanks

This plugin was inspired by [Shopify Vite Plugin](https://shopify-vite.barrelny.com) made by the amazing team at Barrel.

## Want to learn more?

Feel free to check [our documentation](https://docs.blanklob.com) or jump into our [Discord server](https://help.blanklob.com).
