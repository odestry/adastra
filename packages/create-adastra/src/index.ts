import fs from 'fs'
import path from 'path'
import prompts from 'prompts'
import detectPackageManager from 'which-pm-runs'
import yargs from 'yargs-parser'
import ora from 'ora'
import color from 'chalk'

import { execa, execaCommand } from 'execa'
import { downloadTemplate } from 'giget'
import { bold, dim, green, reset } from 'kleur/colors'
import { platform } from 'os'
import {
  generateProjectName,
  label,
  say,
  loadWithRocketGradient,
  rocketAscii,
  random
} from 'adastra-cli-kit'
import { welcome } from 'adastra-branding'
import { banner, getName, getVersion, info, nextSteps } from './messages.js'
import { TEMPLATES } from './templates.js'

// NOTE: In the v7.x version of npm, the default behavior of `npm init` was changed
// to no longer require `--` to pass args and instead pass `--` directly to us. This
// broke our arg parser, since `--` is a special kind of flag. Filtering for `--` here
// fixes the issue so that create-adastra now works on all npm version.
const cleanArgv = process.argv.filter(arg => arg !== '--')
const args = yargs(cleanArgv, { boolean: ['fancy', 'y'], alias: { y: 'yes' } })
// Always skip Tars on Windows (for now)
if (platform() === 'win32') args.skipTars = true
prompts.override(args)

// Some existing files and directories can be safely ignored when checking if a directory is a valid project directory.
// https://github.com/facebook/create-react-app/blob/d960b9e38c062584ff6cfb1a70e1512509a966e7/packages/create-react-app/createReactApp.js#L907-L934
const VALID_PROJECT_DIRECTORY_SAFE_LIST = [
  '.DS_Store',
  '.git',
  '.gitattributes',
  '.gitignore',
  '.gitlab-ci.yml',
  '.hg',
  '.hgcheck',
  '.hgignore',
  '.idea',
  '.npmignore',
  '.travis.yml',
  '.yarn',
  '.yarnrc.yml',
  'docs',
  'LICENSE',
  'mkdocs.yml',
  'Thumbs.db',
  /\.iml$/,
  /^npm-debug\.log/,
  /^yarn-debug\.log/,
  /^yarn-error\.log/
]

const isValidProjectDirectory = (dirPath: string): boolean => {
  if (!fs.existsSync(dirPath)) {
    return true
  }

  const conflicts = fs.readdirSync(dirPath).filter(content => {
    return !VALID_PROJECT_DIRECTORY_SAFE_LIST.some(safeContent => {
      return typeof safeContent === 'string'
        ? content === safeContent
        : safeContent.test(content)
    })
  })

  return conflicts.length === 0
}

const FILES_TO_REMOVE = ['.theme-check.yml', 'CHANGELOG.md'] // some files are only needed for online editors when using adastra.new. Remove for create-adastra installs.

export async function main(): Promise<void> {
  const pkgManager = detectPackageManager()?.name || 'npm'
  const [username, version] = await Promise.all([getName(), getVersion()])

  if (!args.skipTars) {
    await say([
      [
        'Welcome',
        'to',
        label('adastra'),
        color.white(`v${version}`) + ',',
        `${username}!`
      ],
      random(welcome)
    ])
    await banner(version)
  }

  let cwd = args._[2] as string

  // eslint-disable-next-line
  if (cwd && isValidProjectDirectory(cwd)) {
    const acknowledgeProjectDir = ora({
      color: 'yellow',
      text: `Using ${bold(cwd)} as project directory.`
    })
    acknowledgeProjectDir.succeed()
  }

  // eslint-disable-next-line
  if (!cwd || !isValidProjectDirectory(cwd)) {
    const notEmptyMsg = (dirPath: string): string =>
      `"${bold(dirPath)}" is not empty!`

    if (!isValidProjectDirectory(cwd)) {
      const rejectProjectDir = ora({ color: 'red', text: notEmptyMsg(cwd) })
      rejectProjectDir.fail()
    }
    const dirResponse = await prompts(
      {
        type: 'text',
        name: 'directory',
        message:
          'Where would you like to create your new Shopify theme project?',
        initial: generateProjectName(),
        validate(value) {
          if (!isValidProjectDirectory(value)) return notEmptyMsg(value)
          return true
        }
      },
      {
        onCancel: () =>
          ora().info(dim('Operation cancelled. See you later, astronaut!'))
      }
    )
    cwd = dirResponse.directory
  }

  // eslint-disable-next-line
  if (!cwd) {
    ora().info(dim('No directory provided. See you later, astronaut!'))
    process.exit(1)
  }

  const options = await prompts(
    [
      {
        type: 'select',
        name: 'template',
        message: 'How would you like to setup your Shopify theme project?',
        choices: TEMPLATES
      }
    ],
    {
      onCancel: () =>
        ora().info(dim('Operation cancelled. See you later, astronaut!'))
    }
  )

  // eslint-disable-next-line
  if (!options.template || options.template === true) {
    ora().info(dim('No template provided. See you later, astronaut!'))
    process.exit(1)
  }

  const templateSpinner = await loadWithRocketGradient(
    'Copying theme files and folders...'
  )

  // eslint-disable-next-line
  const hash = args.commit ? `#${args.commit}` : ''

  const isThirdParty = options.template.includes('/') as boolean
  const templateTarget = isThirdParty
    ? options.template
    : // eslint-disable-next-line
      `blanklob/adastra/templates/${options.template}#latest`

  // eslint-disable-next-line
  if (!args.dryRun) {
    try {
      // eslint-disable-next-line
      await downloadTemplate(`${templateTarget}${hash}`, {
        force: true,
        provider: 'github',
        cwd,
        dir: '.'
      })
    } catch (err: any) {
      fs.rmdirSync(cwd)
      // eslint-disable-next-line
      if (err.message.includes('404')) {
        console.error(
          `Could not find template ${color.underline(options.template)}!`
        )
        if (isThirdParty) {
          const hasBranch = options.template.includes('#') as boolean
          if (hasBranch) {
            console.error('Are you sure this GitHub repo and branch exist?')
          } else {
            // eslint-disable-next-line
            console.error(
              'Are you sure this GitHub repo exists?' +
                // eslint-disable-next-line
                `This command uses the ${color.bold(
                  'main'
                )} branch by default.\n` +
                // eslint-disable-next-line
                "If the repo doesn't have a main branch, specify a custom branch name:\n" +
                // eslint-disable-next-line
                color.underline(options.template + color.bold('#branch-name'))
            )
          }
        }
      } else {
        console.error(err.message)
      }
      process.exit(1)
    }

    // Post-process in parallel
    await Promise.all(
      FILES_TO_REMOVE.map(async file => {
        const fileLoc = path.resolve(path.join(cwd, file))
        if (fs.existsSync(fileLoc)) {
          return await fs.promises.rm(fileLoc, {})
        }
      })
    )
  }

  templateSpinner.text = green('Theme copied!')
  templateSpinner.succeed()

  // eslint-disable-next-line
  const install = args.y
    ? true
    : (
        await prompts(
          {
            type: 'confirm',
            name: 'install',
            message: `Would you like to install ${pkgManager} dependencies? ${reset(
              dim('(recommended)')
            )}`,
            initial: true
          },
          {
            onCancel: () => {
              ora().info(
                dim(
                  'Operation cancelled. Your project folder has already been created, however no dependencies have been installed'
                )
              )
              process.exit(1)
            }
          }
        )
      ).install

  // eslint-disable-next-line
  if (args.dryRun) {
    ora().info(dim('--dry-run enabled, skipping installing dependencies.'))
    // eslint-disable-next-line
  } else if (install) {
    const installExec = execa(pkgManager, ['install'], { cwd })
    const installingPackagesMsg = `Installing packages${emojiWithFallback(
      ' 📦',
      '...'
    )}`
    const installSpinner = await loadWithRocketGradient(installingPackagesMsg)
    await new Promise<void>((resolve, reject) => {
      installExec.stdout?.on('data', (data: string) => {
        installSpinner.text = `${rocketAscii} ${installingPackagesMsg}\n${bold(
          `[${pkgManager}]`
        )} ${data}`
      })
      // eslint-disable-next-line
      installExec.on('error', error => reject(error))
      // eslint-disable-next-line
      installExec.on('close', () => resolve())
    })
    installSpinner.text = green('Packages installed!')
    installSpinner.succeed()
  } else {
    await info(
      'No problem astronaut!',
      'Remember to install dependencies after setup.'
    )
  }

  // eslint-disable-next-line
  const gitResponse = args.y
    ? true
    : (
        await prompts(
          {
            type: 'confirm',
            name: 'git',
            message: `Would you like to initialize a new git repository? ${reset(
              dim('(optional)')
            )}`,
            initial: true
          },
          {
            onCancel: () => {
              ora().info(
                dim(
                  'Operation cancelled. No worries, your project folder has already been created'
                )
              )
              process.exit(1)
            }
          }
        )
      ).git

  // eslint-disable-next-line
  if (args.dryRun) {
    ora().info(dim('--dry-run enabled, skipping.'))
    // eslint-disable-next-line
  } else if (gitResponse) {
    // Add a check to see if there is already a .git directory and skip 'git init' if yes (with msg to output)
    const gitDir = './.git'
    if (fs.existsSync(gitDir)) {
      ora().info(
        dim(
          'A .git directory already exists. Skipping creating a new Git repository.'
        )
      )
    } else {
      await execaCommand('git init', { cwd })
      ora().succeed('Git repository created!')
    }
  } else {
    await info(
      'Sounds good!',
      `You can come back and run ${color.reset('git init')}${color.dim(
        ' later.'
      )}`
    )
  }

  const projectDir = path.relative(process.cwd(), cwd)
  const devCmd = pkgManager === 'npm' ? 'npm run dev' : `${pkgManager} dev`
  await nextSteps({ projectDir, devCmd })

  // eslint-disable-next-line
  if (!args.skipTars) {
    await say(['Good luck out there, astronaut!'])
  }
}

const emojiWithFallback = (char: string, fallback: string): string => {
  return process.platform !== 'win32' ? char : fallback
}
