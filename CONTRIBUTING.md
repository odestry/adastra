# Working on Adastra ✨

## Getting started

**Requirements:**

- Node.js version 16.14.0 or higher
- Shopify Theme CLI version 3.0.0 or higher

Run the following commands to get started working on Adastra.

| Command                                         | Description                                   |
| ----------------------------------------------- | --------------------------------------------- |
| `git clone git@github.com:blanklob/adastra.git` | Clones the repo to your local computer        |
| `pnpm install`                                  | Installs the dependencies with `pnpm`         |
| `pnpm dev`                                      | Runs the `dev` command in all workspaces      |
| `pnpm build`                                    | `build`s packages for production distribution |

## Context

Adastra ✨ is a monorepo built with [Turborepo](https://turbo.build/) and consists of the following workspaces:

- `examples`: Full working implementations of a Shopify themes to showcase how to use Adastra with other frontend UI libraries and frameworks.
- `templates`: Full working implementations of a Shopify themes built with Adastra, such as the [`basics`](https://labs.blanklob.com/products/basics-template) template used in scafolded projects.
- `packages/adastra-plugin`: The hooks, components, and utilities provided by Adastra
- `packages/adastra-cli-kit`: The hooks, components, and utilities provided by Adastra
- `packages/adastra-cli`: The hooks, components, and utilities provided by Adastra
- `packages/create-adastra`: The hooks, components, and utilities provided by Adastra

Running `pnpm dev` at the root of the monorepo is the most common way to develop and contribute to Adastra ✨. With this task running, each package will be rebuilt when files change.

The `README.md` files in the directories of individual packages and templates contain more specific information for developing in that workspace.

## Formatting and Linting

The Adastra monorepo provides commands for linting and formatting, and uses [Eslint](https://eslint.org/) to run checks.

| Command          | Description                               |
| ---------------- | ----------------------------------------- |
| `pnpm typecheck` | Checks source-code for invalid TypeScript |
| `pnpm lint`      | Lints the code with ESLint                |
| `pnpm check`     | Lints theme code with Theme check         |
| `pnpm format`    | Formats the code with Prettier            |

## Changesets

If you are contributing a user-facing or noteworthy change to Adastra that should be added to the changelog, you should include a changeset with your PR by running the following command.

| Command              | Description             |
| -------------------- | ----------------------- |
| `pnpm changeset add` | Add a changeset locally |

Follow the prompts to select which package(s) are affected by your change, and whether the change is a major, minor or patch change. This will create a file in the `.changesets` directory of the repo. This change should be committed and included with your PR.

**Considerations:**

- You can use markdown in your changeset to include code examples, headings, and more. However, **please use plain text for the first line of your changeset**. The formatting of the GitHub release notes does not support headings as the first line of the changeset.

## Merging PRs

When merging PRs, please select the **Squash and Merge** option, which consolidates all the changes from the PR into a single commit. This helps reduce the commit noise in our Git repository.

## Testing

Adastra tests are run using [vitest](https://vitest.dev). You can run the tests with the following commands.

| Command           | Description                                             |
| ----------------- | ------------------------------------------------------- |
| `pnpm test`       | Run the tests once                                      |
| `pnpm test:watch` | Run the tests once and re-run them when files are saved |

### Debugging tests in Github Actions

Tests that fail **only** in CI can be difficult and time-consuming to debug. If you find yourself in this situation, you can use [tmate](https://tmate.io/) to pause the Github Action on a given step and `ssh` into the container. Once in the container you can use `vim`, inspect the file system and try determining what might be diverging from running tests on your local computer and leading to the failure.

- Add the following `step` in your Github Actions workflow:

```yaml
- name: Setup tmate session
  uses: mxschmitt/action-tmate@v3
```

- Commit and push your changes to Github.
- The testing Github Action will run automatically and you will see it paused with both a Web Shell address and SSH address.
- Copy and paste the SSH address into your terminal.

## Principles to develop by

### Prioritize developer experience

Consider how to provide the best developer experience when using this component or abstraction. Adastra ✨ must be fun and easy to use, with good ergonomics, types and tooling. Developers should be **delighted** when they use Adastra. To quote Tobi Lütke: “Delight works by taking your experience minus your expectation, and if the end result is a positive number, you are delighted by that margin.”
