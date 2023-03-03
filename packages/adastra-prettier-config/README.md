# adastra-prettier-config

Adastra ✨ has an opinionated shared [Prettier](https://prettier.io/) config that you can use when building Shopify Liquid themes and Tailwind.

## Features

- Supports reordering Tailwind classes ✨
- Fomatting with the [Liquid Prettier Plugin](https://shopify.dev/docs/themes/tools/liquid-prettier-plugin) to enforce a consistent style in Liquid and HTML code.

## Installation

Run the following command to install Prettier and the Adastra Prettier config:

```bash
npm install -D prettier adastra-prettier-config
```

Using Yarn/PNPM

```bash
yarn add --dev prettier adastra-prettier-config
# pnpm add -D prettier adastra-prettier-config
```

## Usage

Adastra's shared prettier config comes bundled in `adastra-prettier-config`. To enable these rules, add a Prettier property in your `package.json` and reference this shared config as follows:

```json
"prettier": "adastra-prettier-config"
```

Previously, rules had been defined directly in a `.prettierrc` or `package.json`.

Any previous `.prettierrc` or `prettier.config.js` should be removed in favour of the shared config.

Sometimes when using `pnpm` the config deosn't work because the package manager deosn't read the configuration, to fix the issue, rather than adding your plugin in `package.json`, create a `prettier.config.js` file with this configuration:

```js
module.exports = {
  ...require('adastra-prettier-config')
}
```

### Ignoring formating some theme files

You might wanna ignore some few files that are either autgenrarted or minified on build by creating a `.prettierignore` on the root folder of your Adastra Shopify theme.

```bash
assets
adastra.liquid
node_modules
```

## Want to learn more?

Feel free to check [our documentation](https://docs.blanklob.com) or jump into our [Discord server](https://help.blanklob.com).
