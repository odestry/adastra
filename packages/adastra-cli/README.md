# adastra-cli

Adastra CLI ✨ is a CLI toolkit built on top of Shopify CLI 3.X, this means that existing Adastra commands are the same as Shopify's. The goal from this package is to allow developers to use one CLI intefrace between the Vite and Shopify development servers.

## Requirements

Please make sure you have these two already set up in your local environment for Adastra CLI to work properly.

- NodeJS >= 14 ([Install NodeJS LTS](https://nodejs.org/))
- Shopify Theme CLI >= 3.0

### Install Shopify CLI and Adastra CLI

Shopify CLI is managed as a set of Node.js packages, To install Shopify CLI for themes, install the `@shopify/cli` and `@shopify/theme` Node.js packages globally using the command line and same for `adastra-cli` as well.

```bash
npm install -g @shopify/cli @shopify/theme adastra-cli
```

Using Yarn/PNPM

```bash
yarn global add @shopify/cli @shopify/theme adastra-cli
# pnpm add -g @shopify/cli @shopify/theme adastra-cli
```

### Already have Shopify CLI installed?

You can install `adastra-cli` separately with the following command.

```bash
npm install -g adastra-cli
```

Using Yarn/PNPM

```bash
yarn global add adastra-cli
# pnpm add -g adastra-cli
```

### Verify the installation

To verify that Shopify CLI is installed properly, run the following command (The command returns a version number)

```bash
shopify version
```

Verify Adastra CLI with (The command returns a help message)

```bash
adastra --help
```

## Commands

To launch Shopify and [Vite](https://vitejs.dev) development server, you can use `adastra dev` command which support all `shopify theme dev` flags and arguments. Here is an example:

```bash
adastra dev -s example-store.myshopify.com
# same as shopify theme dev -s example-store.myshopify.com
```

> 💡 The command will launch two dev servers, the first for Vite at `localhost:5173` to server static files from the `src` directory and the second for Shopify at `localhost:9292` to serve your theme.

All commands must run from the root of the theme project.

### Other commands

| Command           | Action                                                                |
| :---------------- | :-------------------------------------------------------------------- |
| `adastra build`   | Build and minifies your production static files to `./assets/` folder |
| `adastra preview` | Preview of your remote development theme, before deploying            |
| `adastra check`   | Run theme check to lint the theme                                     |
| `adastra --help`  | Get help using the Adastra CLI                                        |

## Want to learn more?

Feel free to check [our documentation](https://docs.blanklob.com) or jump into our [Discord server](https://help.blanklob.com).
