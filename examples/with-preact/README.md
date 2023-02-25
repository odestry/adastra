# Adastra Example with Preact ✨

```shell
npm create adastra@latest -- --template minimal
```

> 🧑‍🚀 **Hey astronaut?** Have fun building Shopify themes with Adastra!

![minimal](https://raw.githubusercontent.com/blanklob/adastra/main/.github/assets/minimal-template-banner.png)

## Theme Structure

Inside of your Adastra theme project, you'll see the following folders and files.

1. Most Shopify themes files and folders remain the same.
2. There is only one additional **Super Special** folder called `src`.
3. Instead of directly editing static assets in the theme `assets` directory, you will use the new `src` directory instead.
4. The new `src` supports everything the `assets` directory deos and more 🌟
5. Static files inside the `src` directory are served by [Vite](https://vitejs.dev).

```shell
/
├── assets
├── config
├── layout
├── locales
├── sections/
│   └── hello-world.liquid
├── snippets/
│   └── colors.liquid
├── src/
│   ├── components/
│   │   └── hello-world.js
│   ├── index.js
│   └── base.css
├── templates
└── package.json
```

Adastra looks for `entrypoint` files in the root `src/` directory. In this case `base.css` for styles and `index.js` for scripts.

There's nothing special about `src/components/`, but that's where we like to put any Native/React/Vue/Svelte/Preact components.

You can create other folders like `src/utils/` if you want, only the files imported and the entrypoint files will be served by Vite.

Any static assets, like custom fonts, manifest files, can be placed in the `src/public/` directory.

## Commands

Adastra CLI ✨ is built on top of Shopify CLI 3.X, this means that all Shopify CLI commands are also available in Adastra CLI.

All commands are run from the root of the theme project, from a terminal:

### Launch development server

To launch the development server for the first time, you will need to replace the development command inside the `package.json` with the following:

```json
"scripts": {
  - "dev": "adastra dev",
  "dev": "adastra dev -s example-store.myshopify.com",
  ...
}
```

> 💡 The command will launch two dev servers, the first for Vite at `localhost:5173` to server static files from the `src` directory and the second for Shopify at `localhost:9292` to serve your theme.

### Other commands

| Command                | Action                                           |
| :--------------------- | :----------------------------------------------- |
| `npm install`          | Installs dependencies                            |
| `npm run build`        | Build your production static files to `./assets/` folder |
| `npm run preview`      | Preview of your remote development theme, before deploying |
| `npm run check`        | Run theme check to lint the theme |
| `npm run adastra ...`    | Run CLI commands like `adastra dev`, `adastra check` |
| `npm run adastra --help` | Get help using the Adastra CLI |

## Want to learn more?

Feel free to check [our documentation](https://docs.blanklob.com) or jump into our [Discord server](https://help.blanklob.com/).
