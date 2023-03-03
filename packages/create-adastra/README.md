# create-adastra

Adastra ✨ create CLI is for scaffolding Adastra theme projects in no time.

**With NPM:**

```bash
npm create adastra@latest
```

**With Yarn:**

```bash
yarn create adastra
```

**With PNPM:**

```bash
pnpm create adastra
```

`create-adastra` automatically runs in _interactive_ mode, but you can also specify your project name and template with command line arguments.

```bash
# npm 6.x
npm create adastra@latest my-shopify-theme --template minimal

# npm 7+, extra double-dash is needed:
npm create adastra@latest my-shopify-theme -- --template minimal

# yarn
yarn create adastra my-shopify-theme --template minimal

# pnpm
pnpm create adastra my-shopify-theme --template minimal
```

[Check out the full list][examples] of example starter themes and usecases.

You can also use any GitHub repo as a template:

```bash
npm create adastra@latest my-adastra-theme -- --template blanklob/adastra-minimal-template
```

## Adastra create CLI Flags

May be provided in place of prompts

| Name                         | Description                             |
| :--------------------------- | :-------------------------------------- |
| `--template <name>`          | Specify your Adastra ✨ theme template. |
| `--install` / `--no-install` | Install dependencies (or not).          |
| `--git` / `--no-git`         | Initialize git repo (or not).           |
| `--yes` (`-y`)               | Skip all prompt by accepting defaults.  |
| `--no` (`-n`)                | Skip all prompt by declining defaults.  |
| `--dry-run`                  | Walk through steps without executing.   |
| `--skip-tars`                | Skip Tars mascot animation.             |

[examples]: https://github.com/blanklob/adastra/tree/main/examples

## Want to learn more?

Feel free to check [our documentation](https://docs.blanklob.com) or jump into our [Discord server](https://help.blanklob.com).
