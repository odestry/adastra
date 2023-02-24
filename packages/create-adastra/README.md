# `create-adastra`

## Scaffolding for Adastra theme projects

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
```

[Check out the full list][examples] of example starter templates, available on GitHub.

You can also use any GitHub repo as a template:

```bash
npm create adastra@latest my-adastra-theme -- --template blanklob/adastra-minimal-template
```

### CLI Flags

May be provided in place of prompts

| Name         | Description                                                                                                         |
| :----------- | :------------------------------------------------------------------------------------------------------------------ | --- |
| `--template` | Specify the template name ([list][templates])                                                                       |
| `--commit`   | Specify a specific Git commit or branch to use from this repo (by default, `main` branch of this repo will be used) |
| `--fancy`    | For Windows users, `--fancy` will enable full unicode support                                                       |     |
| `--yes`/`-y` | Skip prompts and use default values                                                                                 |

### Debugging

To debug `create-adastra`, you can use the `--verbose` flag which will log the output of degit and some more information about the command, this can be useful when you encounter an error and want to report it.

```bash
# npm 6.x
npm create adastra@latest my-shopify-theme --verbose

# npm 7+, extra double-dash is needed:
npm create adastra@latest my-shopify-theme -- --verbose

# yarn
yarn create adastra my-shopify-theme --verbose
```
