import path from "path"
import { styleText } from "util"
import fs from "fs"
import { intro, outro, select, text } from "@clack/prompts"
import { rm } from "fs/promises"
import { execSync } from "child_process"
import { CreateArgv } from "./args.js"
import { exitIfCancel, escapePath } from "./helpers.js"
import { version, cwd } from "./constants.js"
import { resolveContentPath } from "./resolveContentPath.js"

/**
 * Handles `npx quartz create`
 * @param {*} argv arguments for `create`
 */
export async function handleCreate(argv) {
  console.log()
  intro(styleText(["bgGreen", "black"], ` Quartz v${version} `))
  const contentFolder = resolveContentPath(argv.directory)
  let setupStrategy = argv.strategy?.toLowerCase()
  let linkResolutionStrategy = argv.links?.toLowerCase()
  const sourceDirectory = argv.source

  // If all cmd arguments were provided, check if they're valid
  if (setupStrategy && linkResolutionStrategy) {
    // If setup isn't, "new", source argument is required
    if (setupStrategy !== "new") {
      // Error handling
      if (!sourceDirectory) {
        outro(
          styleText(
            "red",
            `Setup strategies (arg '${styleText(
              "yellow",
              `-${CreateArgv.strategy.alias[0]}`,
            )}') other than '${styleText(
              "yellow",
              "new",
            )}' require content folder argument ('${styleText(
              "yellow",
              `-${CreateArgv.source.alias[0]}`,
            )}') to be set`,
          ),
        )
        process.exit(1)
      } else {
        if (!fs.existsSync(sourceDirectory)) {
          outro(
            styleText(
              "red",
              `Input directory to copy/symlink 'content' from not found ('${styleText(
                "yellow",
                sourceDirectory,
              )}', invalid argument "${styleText("yellow", `-${CreateArgv.source.alias[0]}`)})`,
            ),
          )
          process.exit(1)
        } else if (!fs.lstatSync(sourceDirectory).isDirectory()) {
          outro(
            styleText(
              "red",
              `Source directory to copy/symlink 'content' from is not a directory (found file at '${styleText(
                "yellow",
                sourceDirectory,
              )}', invalid argument ${styleText("yellow", `-${CreateArgv.source.alias[0]}`)}")`,
            ),
          )
          process.exit(1)
        }
      }
    }
  }

  // Use cli process if cmd args werent provided
  if (!setupStrategy) {
    setupStrategy = exitIfCancel(
      await select({
        message: `Choose how to initialize the content in \`${contentFolder}\``,
        options: [
          { value: "new", label: "Empty Quartz" },
          { value: "copy", label: "Copy an existing folder", hint: "overwrites `content`" },
          {
            value: "symlink",
            label: "Symlink an existing folder",
            hint: "don't select this unless you know what you are doing!",
          },
        ],
      }),
    )
  }

  async function rmContentFolder() {
    const contentStat = await fs.promises.lstat(contentFolder)
    if (contentStat.isSymbolicLink()) {
      await fs.promises.unlink(contentFolder)
    } else {
      await rm(contentFolder, { recursive: true, force: true })
    }
  }

  const gitkeepPath = path.join(contentFolder, ".gitkeep")
  if (fs.existsSync(gitkeepPath)) {
    await fs.promises.unlink(gitkeepPath)
  }
  if (setupStrategy === "copy" || setupStrategy === "symlink") {
    let originalFolder = sourceDirectory

    // If input directory was not passed, use cli
    if (!sourceDirectory) {
      originalFolder = escapePath(
        exitIfCancel(
          await text({
            message: "Enter the full path to existing content folder",
            placeholder:
              "On most terminal emulators, you can drag and drop a folder into the window and it will paste the full path",
            validate(fp) {
              const fullPath = escapePath(fp)
              if (!fs.existsSync(fullPath)) {
                return "The given path doesn't exist"
              } else if (!fs.lstatSync(fullPath).isDirectory()) {
                return "The given path is not a folder"
              }
            },
          }),
        ),
      )
    }

    await rmContentFolder()
    if (setupStrategy === "copy") {
      await fs.promises.cp(originalFolder, contentFolder, {
        recursive: true,
        preserveTimestamps: true,
      })
    } else if (setupStrategy === "symlink") {
      await fs.promises.symlink(originalFolder, contentFolder, "dir")
    }
  } else if (setupStrategy === "new") {
    await fs.promises.writeFile(
      path.join(contentFolder, "index.md"),
      `---
title: Welcome to Quartz
---

This is a blank Quartz installation.
See the [documentation](https://quartz.jzhao.xyz) for how to get started.
`,
    )
  }

  // Use cli process if cmd args werent provided
  if (!linkResolutionStrategy) {
    // get a preferred link resolution strategy
    linkResolutionStrategy = exitIfCancel(
      await select({
        message: `Choose how Quartz should resolve links in your content. This should match Obsidian's link format. You can change this later in \`quartz.config.ts\`.`,
        options: [
          {
            value: "shortest",
            label: "Treat links as shortest path",
            hint: "(default)",
          },
          {
            value: "absolute",
            label: "Treat links as absolute path",
          },
          {
            value: "relative",
            label: "Treat links as relative paths",
          },
        ],
      }),
    )
  }

  // now, do config changes
  const configFilePath = path.join(cwd, "quartz.config.ts")
  let configContent = await fs.promises.readFile(configFilePath, { encoding: "utf-8" })
  configContent = configContent.replace(
    /markdownLinkResolution: '(.+)'/,
    `markdownLinkResolution: '${linkResolutionStrategy}'`,
  )
  await fs.promises.writeFile(configFilePath, configContent)

  // setup remote
  execSync(
    `git remote show upstream || git remote add upstream https://github.com/jackyzha0/quartz.git`,
    { stdio: "ignore" },
  )

  outro(`You're all set! Not sure what to do next? Try:
  • Customizing Quartz a bit more by editing \`quartz.config.ts\`
  • Running \`npx quartz build --serve\` to preview your Quartz locally
  • Hosting your Quartz online (see: https://quartz.jzhao.xyz/hosting)
`)
}
