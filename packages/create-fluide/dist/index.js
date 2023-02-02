import {
  loadWithRocketGradient,
  rocketAscii
} from "./chunk-N5I6AWCS.js";
import {
  logger
} from "./chunk-L2LE77HT.js";
import {
  banner,
  getName,
  getVersion,
  info,
  nextSteps,
  typescriptByDefault,
  welcome
} from "./chunk-AQEBHBDV.js";
import {
  TEMPLATES
} from "./chunk-4M7BUSKM.js";
import {
  random
} from "./chunk-UIY7LUGK.js";

// src/index.ts
import fs from "fs";
import path from "path";
import prompts from "prompts";
import detectPackageManager from "which-pm-runs";
import yargs from "yargs-parser";
import ora from "ora";
import color from "chalk";
import { assign, parse, stringify } from "comment-json";
import { execa, execaCommand } from "execa";
import { downloadTemplate } from "giget";
import { bold, dim, green, reset, yellow } from "kleur/colors";
import { platform } from "os";
import { brand, generateProjectName, label, say } from "@fluide/cli-kit";
var cleanArgv = process.argv.filter((arg) => arg !== "--");
var args = yargs(cleanArgv, { boolean: ["fancy", "y"], alias: { y: "yes" } });
if (platform() === "win32")
  args.skipTars = true;
prompts.override(args);
var mkdirp = (dir) => {
  try {
    fs.mkdirSync(dir, { recursive: true });
  } catch (e) {
    if (e.code === "EEXIST")
      return;
    throw e;
  }
};
var VALID_PROJECT_DIRECTORY_SAFE_LIST = [
  ".DS_Store",
  ".git",
  ".gitattributes",
  ".gitignore",
  ".gitlab-ci.yml",
  ".hg",
  ".hgcheck",
  ".hgignore",
  ".idea",
  ".npmignore",
  ".travis.yml",
  ".yarn",
  ".yarnrc.yml",
  "docs",
  "LICENSE",
  "mkdocs.yml",
  "Thumbs.db",
  /\.iml$/,
  /^npm-debug\.log/,
  /^yarn-debug\.log/,
  /^yarn-error\.log/
];
var isValidProjectDirectory = (dirPath) => {
  if (!fs.existsSync(dirPath)) {
    return true;
  }
  const conflicts = fs.readdirSync(dirPath).filter((content) => {
    return !VALID_PROJECT_DIRECTORY_SAFE_LIST.some((safeContent) => {
      return typeof safeContent === "string" ? content === safeContent : safeContent.test(content);
    });
  });
  return conflicts.length === 0;
};
var FILES_TO_REMOVE = [".theme-check.yml", "CHANGELOG.md"];
async function main() {
  const pkgManager = detectPackageManager()?.name || "npm";
  const [username, version] = await Promise.all([getName(), getVersion()]);
  logger.debug("Verbose logging turned on");
  if (!args.skipTars) {
    await say(
      [
        [
          "Welcome",
          "to",
          label("fluide"),
          color.hex(brand.colors.yellowgreen)(`v${version}`) + ",",
          `${username}!`
        ],
        random(welcome)
      ]
    );
    await banner(version);
  }
  let cwd = args._[2];
  if (cwd && isValidProjectDirectory(cwd)) {
    const acknowledgeProjectDir = ora({
      color: "yellow",
      text: `Using ${bold(cwd)} as project directory.`
    });
    acknowledgeProjectDir.succeed();
  }
  if (!cwd || !isValidProjectDirectory(cwd)) {
    const notEmptyMsg = (dirPath) => `"${bold(dirPath)}" is not empty!`;
    if (!isValidProjectDirectory(cwd)) {
      const rejectProjectDir = ora({ color: "red", text: notEmptyMsg(cwd) });
      rejectProjectDir.fail();
    }
    const dirResponse = await prompts(
      {
        type: "text",
        name: "directory",
        message: "Where would you like to create your new Shopify project?",
        initial: generateProjectName(),
        validate(value) {
          if (!isValidProjectDirectory(value))
            return notEmptyMsg(value);
          return true;
        }
      },
      { onCancel: () => ora().info(dim("Operation cancelled. See you later, astronaut!")) }
    );
    cwd = dirResponse.directory;
  }
  if (!cwd) {
    ora().info(dim("No directory provided. See you later, astronaut!"));
    process.exit(1);
  }
  const options = await prompts(
    [
      {
        type: "select",
        name: "template",
        message: "How would you like to setup your theme project?",
        choices: TEMPLATES
      }
    ],
    {
      onCancel: () => ora().info(dim("Operation cancelled. See you later, astronaut!"))
    }
  );
  if (!options.template || options.template === true) {
    ora().info(dim("No template provided. See you later, astronaut!"));
    process.exit(1);
  }
  const templateSpinner = await loadWithRocketGradient("Copying theme files and folders...");
  const hash = args.commit ? `#${args.commit}` : "";
  const isThirdParty = options.template.includes("/");
  const templateTarget = isThirdParty ? options.template : `withastro/astro/examples/${options.template}#latest`;
  if (!args.dryRun) {
    try {
      await downloadTemplate(`${templateTarget}${hash}`, {
        force: true,
        provider: "github",
        cwd,
        dir: "."
      });
    } catch (err) {
      fs.rmdirSync(cwd);
      if (err.message.includes("404")) {
        console.error(`Could not find template ${color.underline(options.template)}!`);
        if (isThirdParty) {
          const hasBranch = options.template.includes("#");
          if (hasBranch) {
            console.error("Are you sure this GitHub repo and branch exist?");
          } else {
            console.error(
              `Are you sure this GitHub repo exists?This command uses the ${color.bold("main")} branch by default.
If the repo doesn't have a main branch, specify a custom branch name:
` + color.underline(options.template + color.bold("#branch-name"))
            );
          }
        }
      } else {
        console.error(err.message);
      }
      process.exit(1);
    }
    await Promise.all(
      FILES_TO_REMOVE.map(async (file) => {
        const fileLoc = path.resolve(path.join(cwd, file));
        if (fs.existsSync(fileLoc)) {
          return await fs.promises.rm(fileLoc, {});
        }
      })
    );
  }
  templateSpinner.text = green("Theme copied!");
  templateSpinner.succeed();
  const install = args.y ? true : (await prompts(
    {
      type: "confirm",
      name: "install",
      message: `Would you like to install ${pkgManager} dependencies? ${reset(dim("(recommended)"))}`,
      initial: true
    },
    {
      onCancel: () => {
        ora().info(
          dim(
            "Operation cancelled. Your project folder has already been created, however no dependencies have been installed"
          )
        );
        process.exit(1);
      }
    }
  )).install;
  if (args.dryRun) {
    ora().info(dim("--dry-run enabled, skipping installing dependencies."));
  } else if (install) {
    const installExec = execa(pkgManager, ["install"], { cwd });
    const installingPackagesMsg = `Installing packages${emojiWithFallback(" \u{1F4E6}", "...")}`;
    const installSpinner = await loadWithRocketGradient(installingPackagesMsg);
    await new Promise((resolve, reject) => {
      installExec.stdout?.on("data", (data) => {
        installSpinner.text = `${rocketAscii} ${installingPackagesMsg}
${bold(`[${pkgManager}]`)} ${data}`;
      });
      installExec.on("error", (error) => reject(error));
      installExec.on("close", () => resolve());
    });
    installSpinner.text = green("Packages installed!");
    installSpinner.succeed();
  } else {
    await info("No problem astronaut!", "Remember to install dependencies after setup.");
  }
  const gitResponse = args.y ? true : (await prompts(
    {
      type: "confirm",
      name: "git",
      message: `Would you like to initialize a new git repository? ${reset(dim("(optional)"))}`,
      initial: true
    },
    {
      onCancel: () => {
        ora().info(
          dim("Operation cancelled. No worries, your project folder has already been created")
        );
        process.exit(1);
      }
    }
  )).git;
  if (args.dryRun) {
    ora().info(dim("--dry-run enabled, skipping."));
  } else if (gitResponse) {
    const gitDir = "./.git";
    if (fs.existsSync(gitDir)) {
      ora().info(dim("A .git directory already exists. Skipping creating a new Git repository."));
    } else {
      await execaCommand("git init", { cwd });
      ora().succeed("Git repository created!");
    }
  } else {
    await info("Sounds good!", `You can come back and run ${color.reset("git init")}${color.dim(" later.")}`);
  }
  if (args.y && !args.typescript) {
    ora().warn(dim('--typescript <choice> missing. Defaulting to "strict"'));
    args.typescript = "strict";
  }
  let tsResponse = args.typescript || (await prompts(
    {
      type: "select",
      name: "typescript",
      message: "How would you like to setup TypeScript?",
      choices: [
        { value: "strict", title: "Strict", description: "(recommended)" },
        { value: "strictest", title: "Strictest" },
        { value: "base", title: "Relaxed" },
        { value: "unsure", title: "Help me choose" }
      ]
    },
    {
      onCancel: () => {
        ora().info(
          dim(
            "Operation cancelled. Your project folder has been created but no TypeScript configuration file was created."
          )
        );
        process.exit(1);
      }
    }
  )).typescript;
  if (tsResponse === "unsure") {
    await typescriptByDefault();
    tsResponse = "base";
  }
  if (args.dryRun) {
    ora().info(dim("--dry-run enabled, skipping."));
  } else if (tsResponse) {
    const templateTSConfigPath = path.join(cwd, "tsconfig.json");
    fs.readFile(templateTSConfigPath, (err, data) => {
      if (err != null && err.code === "ENOENT") {
        fs.writeFileSync(
          templateTSConfigPath,
          stringify({ extends: `astro/tsconfigs/${tsResponse ?? "base"}` }, null, 2)
        );
        return;
      }
      const templateTSConfig = parse(data.toString());
      if (templateTSConfig && typeof templateTSConfig === "object") {
        const result = assign(templateTSConfig, {
          extends: `astro/tsconfigs/${tsResponse ?? "base"}`
        });
        fs.writeFileSync(templateTSConfigPath, stringify(result, null, 2));
      } else {
        console.log(
          yellow("There was an error applying the requested TypeScript settings. This could be because the template's tsconfig.json is malformed")
        );
      }
    });
    ora().succeed("TypeScript settings applied!");
  }
  const projectDir = path.relative(process.cwd(), cwd);
  const devCmd = pkgManager === "npm" ? "npm run dev" : `${pkgManager} dev`;
  await nextSteps({ projectDir, devCmd });
  if (!args.skipTars) {
    await say(["Good luck out there, astronaut!"]);
  }
}
var emojiWithFallback = (char, fallback) => {
  return process.platform !== "win32" ? char : fallback;
};
export {
  main,
  mkdirp
};
