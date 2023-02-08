![The Adastra logo.](.github/assets/banner.png 'The Adastra logo.')

<p align="center">
  <br/>
  Adastra ✨ is a powerful and flexible framework for building custom and unique &mdash;
  <br/>
  Shopify online stores and themes with next-gen frontend tooling.
  <br/>
</p>

## Key Features

- **Flexible** Can seamlessly be integrated with existing workflows and Shopify themes.
- **Outstanding DX** Support Hot Reload out of the box and has custom CLI built on top of the Shopify CLI.
- **Fast, by default** Supports JS code splitting and lazyloading static files.
- **UI-agnostic** Supports React, Preact, Svelte, Vue, Solid, Lit and more. (examples coming soon)
- **Customizable** Tailwind, React, Vue, and many other frameworks to choose from.

## Build in public

This project is maintained, and I'm currently building it in public. You can follow the progress on Twitter [@blanklob](https://twitter.com/blanklob).

> **Warning**
> This is work in progress. This repository is only a Theme demo for Shopify developers to try **Adastra** and send feedback or report issues, its not yet a production ready framework 🙂

Once we hit a stable version, I will release the full packages and repository under and MIT Licence 💚

## Start your first theme project

To start a project, its the same steps you would usually do in a standard Shopify theme project, the only extra step is to **install dependencies**.

### Requirements

Before getting started with **Adastra** 🌟 make sure you have at least Node v14 installed, I recommend having LTS version to make sure the Adastra CLI works properly with no issues.

Check your node version with

```bash
node --version
```

> If not, then check how to update Node on your local machine [here](https://nodejs.org/en/download).

### Installation

After cloning the repository, the first thing you should do is install dependencies using

```bash
npm install # yarn or pnpm install
```

### Lauching the development server

To launch the development server you don't need Shopify CLI for that, **Adastra** 🌟 comes with its custom CLI, which is a <mark>wrapper over the Shopify CLI</mark>, the **Adastra CLI** command is an enhanced Shopify CLI command. To get started.

```bash
npm run dev # yarn or pnpm dev
```

If the command deosn't work, its propably because you are not logged in to a store yet, you can do so by either changing the command in `package.json` or login with Shopify CLI.

```json
"scripts": {
  - "dev": "adastra dev",
  "dev": "adastra dev -s example-store.myshopify.com",
}
```

> The command will launch two development servers, one for Shopify, and the other for Vite.

## How it works?

In nutshell, all Shopify theme folder remain the same, except for one folder, the `assets` folder is replaced with a new folder in the root of the project called `src` all static files (Javascript, styles, fonts, etc..) need to be inside this folder instead of the assets folder.

By default **Adastra 🌟** watches changes in this folder, so you dont need to build files during development, the only time you build files is when  you are ready to ship to production. Thats why `assets` folder is added in `.gitignore` by default.

Also **Adastra 🌟** automaticely upon launching the dev server creates a snippet, to add all required Liquid code for Vite to work properly. No need to remove or the change this snippet located `snippets/adastra.liquid`

## Roadmap

👉 You can find the roadmap [here](https://github.com/users/blanklob/projects/5).

## Documentation

Currently documentation is under construction 🚧 this is project is still under development, however expect [upcoming documentation](https://docs.blanklob.com/) soon in the days to come.

## Support

Having trouble? Get help in the official [Discord](https://chat.blanklob.com).

## Contributing

**New contributors welcome!** Check out our [Contributors Guide](CONTRIBUTING.md) for help getting started.

Join us on [Discord](https://chat.blanklob.com) to meet other Shopify developers. We'll help you with your Shopify project in no time!

## Useful Links

Learn more about theme development principals and native web capabilities:

- [Shopify best practices](https://shopify.dev/themes/best-practices)
- [Shopify developer tools](https://shopify.dev/themes/tools)
- [Native web components](https://developer.mozilla.org/fr/docs/Web/Web_Components)
- [Progressive enhancement](https://css-tricks.com/embrace-the-platform)

<!-- Markdown links & img dfn's -->
[ci-url]: https://github.com/blanklob/adastra/actions/workflows/ci.yml
[ci-badge]: https://github.com/blanklob/adastra/actions/workflows/ci.yml/badge.svg
