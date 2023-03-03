![adastra](.github/assets/banner.png)

<p align="center">
  <br/>
  Adastra ✨ is a powerful and flexible framework for building custom and unique &mdash;
  <br/>
  Shopify Themes with next-gen frontend tooling.
  <br/>
</p>

<p align="center">
 <a href="https://npmjs.com/package/adastra-plugin"><img src="https://img.shields.io/npm/v/adastra-plugin.svg" alt="npm package"></a>
<a href="https://github.com/blanklob/adastra/actions"><img src="https://github.com/blanklob/adastra/workflows/CI/badge.svg" alt="Build Status"></a>
<a href="https://www.npmjs.com/package/adastra-plugin"><img src="https://img.shields.io/npm/l/adastra-plugin" alt="License"></a>
<a href="https://help.blanklob.com?ref=github"><img src="https://img.shields.io/badge/chat-discord-blue?style=flat&logo=discord" alt="discord chat"></a>
</p>

## Install

The recommended way to scaffold an Adastra ✨ theme project is by running the command below:

```shell
npm create adastra@latest
```

Using Yarn/PNPM

```shell
yarn create adastra@latest
# pnpm create adastra@latest
```

Adastra came from the Latin word Ad-astra which stands for **To the Stars** ✨

## Key Features ✨

- **Flexible** Can seamlessly be integrated with existing workflows and Shopify themes.
- **Outstanding DX** Lightning Fast HMR for static files and has custom CLI built on top of the Shopify CLI.
- **Fast, by default** Supports modules/scripts code splitting and lazyloading static files.
- **UI-agnostic** Supports React, Preact, Solid, Vue, Solid, Lit and more. (more examples coming soon)
- **Customizable** Sensible built-in default configs for use in existing themes and highly extensible.

### Requirements

Please **make sure** you have these two already set up in your local environment.

- Node.js version 14 or higher (LTS recommended)
- Shopify Theme CLI version 3.0.0 or higher

## Packages

| Package                                                       | Changelog                                                    | Version                                                                                                                                                |
| ------------------------------------------------------------- | ------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| [adastra-plugin](./packages/adastra-plugin)                   | [CHANGELOG](./packages/adastra-plugin/CHANGELOG.md)          | <a href="https://npmjs.com/package/adastra-plugin"><img src="https://img.shields.io/npm/v/adastra-plugin.svg" alt="npm package"></a>                   |
| [adastra-cli](./packages/adastra-cli)                         | [CHANGELOG](./packages/adastra-cli/CHANGELOG.md)             | <a href="https://npmjs.com/package/adastra-cli"><img src="https://img.shields.io/npm/v/adastra-cli.svg" alt="npm package"></a>                         |
| [adastra-cli-kit](./packages/adastra-cli-kit)                 | [CHANGELOG](./packages/adastra-cli-kit/CHANGELOG.md)         | <a href="https://npmjs.com/package/adastra-cli-kit"><img src="https://img.shields.io/npm/v/adastra-cli-kit.svg" alt="npm package"></a>                 |
| [create-adastra](./packages/create-adastra)                   | [CHANGELOG](./packages/create-adastra/CHANGELOG.md)          | <a href="https://npmjs.com/package/create-adastra"><img src="https://img.shields.io/npm/v/create-adastra.svg" alt="npm package"></a>                   |
| [adastra-branding](./packages/adastra-branding)               | [CHANGELOG](./packages/adastra-branding/CHANGELOG.md)        | <a href="https://npmjs.com/package/adastra-branding"><img src="https://img.shields.io/npm/v/adastra-branding.svg" alt="npm package"></a>               |
| [adastra-prettier-config](./packages/adastra-prettier-config) | [CHANGELOG](./packages/adastra-prettier-config/CHANGELOG.md) | <a href="https://npmjs.com/package/adastra-prettier-config"><img src="https://img.shields.io/npm/v/adastra-prettier-config.svg" alt="npm package"></a> |

## Examples & Templates

Adastra ✨ comes with so many examples to showcase, how it can be used with all of these frontend tools and ui frameworks, to build next generation online storefronts.

| Theme/Example                                                   | Command                                                                                  |
| --------------------------------------------------------------- | ---------------------------------------------------------------------------------------- |
| [Minimal Template](./templates/minimal)                         | `npm create adastra -- --template minimal`                                               |
| [Basics Template (Tailwind)](./templates/basics)                | `npm create adastra -- --template basics`                                                |
| [Example with React](./examples/with-react)                     | `npm create adastra@latest -- --template blanklob/adastra/examples/with-react`           |
| [Example with Vue](./examples/with-vue)                         | `npm create adastra@latest -- --template blanklob/adastra/examples/with-vue`             |
| [Example with Preact](./examples/with-preact)                   | `npm create adastra@latest -- --template blanklob/adastra/examples/with-preact`          |
| [Example with Solid](./examples/with-solid)                     | `npm create adastra@latest -- --template blanklob/adastra/examples/with-solid`           |
| [Example with Typescript](./examples/with-typescript)           | `npm create adastra@latest -- --template blanklob/adastra/examples/with-typescript`      |
| [Example with Lit](./examples/with-lit)                         | `npm create adastra@latest -- --template blanklob/adastra/examples/with-lit`             |
| [Example with Alpine](./examples/with-alpine)                   | `npm create adastra@latest -- --template blanklob/adastra/examples/with-alpine`          |
| [Example with GSAP](./examples/with-gsap)                       | `npm create adastra@latest -- --template blanklob/adastra/examples/with-gsap`            |
| [Example with Sass](./examples/with-sass)                       | `npm create adastra@latest -- --template blanklob/adastra/examples/with-sass`            |
| [Example with Less](./examples/with-less)                       | `npm create adastra@latest -- --template blanklob/adastra/examples/with-less`            |
| [Example with Vanilla Extract](./examples/with-vanilla-extract) | `npm create adastra@latest -- --template blanklob/adastra/examples/with-vanilla-extract` |

More examples coming soon.

## Documentation

Currently web documentation is under construction 🚧 you can check docs on every package.

- Adastra Plugin Docs ([here](./packages/adastra-plugin/README.md))
- Adastra CLI Docs ([here](./packages/adastra-cli/README.md))
- Adastra Create Theme CLI ([here](./packages/create-adastra/README.md))

## Roadmap

This project is maintained, and I'm currently building it in public. You can follow the progress on Twitter [@blanklob](https://twitter.com/blanklob). You can find the roadmap [here](https://github.com/users/blanklob/projects/5) as well.

## Support & Contributing

**New contributors Welcome!** Check out our [Contributors Guide](CONTRIBUTING.md) for help getting started.

Having trouble? Get help in the official [Discord](https://help.blanklob.com) and meet other Shopify developers who build using Adastra ✨

## Special Thanks

- [Shopify CLI](https://github.com/Shopify/cli) for inspiring Adastra ✨ CLI.
- [Shopify Vite Plugin](https://shopify-vite.barrelny.com) for inspiring the Vite plugin.
- [Astro](https://astro.build) for inspiring the Create Adastra CLI.
- [Hydrogen](https://hydrogen.shopify.dev) for inspiring development principles and architecture.

<!-- Markdown links & img dfn's -->

[ci-url]: https://github.com/blanklob/adastra/actions/workflows/ci.yml
[ci-badge]: https://github.com/blanklob/adastra/actions/workflows/ci.yml/badge.svg
