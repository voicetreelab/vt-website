import { styleText } from "util"
import fs from "fs"
import { execSync, spawnSync } from "child_process"
import {
  gitPull,
  popContentFolder,
  stashContentFolder,
} from "./helpers.js"
import {
  ORIGIN_NAME,
  QUARTZ_SOURCE_BRANCH,
  version,
} from "./constants.js"
import { resolveContentPath } from "./resolveContentPath.js"

/**
 * Handles `npx quartz sync`
 * @param {*} argv arguments for `sync`
 */
export async function handleSync(argv) {
  const contentFolder = resolveContentPath(argv.directory)
  console.log(`\n${styleText(["bgGreen", "black"], ` Quartz v${version} `)}\n`)
  console.log("Backing up your content")

  if (argv.commit) {
    const contentStat = await fs.promises.lstat(contentFolder)
    if (contentStat.isSymbolicLink()) {
      const linkTarg = await fs.promises.readlink(contentFolder)
      console.log(styleText("yellow", "Detected symlink, trying to dereference before committing"))

      // stash symlink file
      await stashContentFolder(contentFolder)

      // follow symlink and copy content
      await fs.promises.cp(linkTarg, contentFolder, {
        recursive: true,
        preserveTimestamps: true,
      })
    }

    const currentTimestamp = new Date().toLocaleString("en-US", {
      dateStyle: "medium",
      timeStyle: "short",
    })
    const commitMessage = argv.message ?? `Quartz sync: ${currentTimestamp}`
    spawnSync("git", ["add", "."], { stdio: "inherit" })
    spawnSync("git", ["commit", "-m", commitMessage], { stdio: "inherit" })

    if (contentStat.isSymbolicLink()) {
      // put symlink back
      await popContentFolder(contentFolder)
    }
  }

  await stashContentFolder(contentFolder)

  if (argv.pull) {
    console.log(
      "Pulling updates from your repository. You may need to resolve some `git` conflicts if you've made changes to components or plugins.",
    )
    try {
      gitPull(ORIGIN_NAME, QUARTZ_SOURCE_BRANCH)
    } catch {
      console.log(styleText("red", "An error occurred above while pulling updates."))
      await popContentFolder(contentFolder)
      return
    }
  }

  await popContentFolder(contentFolder)
  if (argv.push) {
    console.log("Pushing your changes")
    const currentBranch = execSync("git rev-parse --abbrev-ref HEAD").toString().trim()
    const res = spawnSync("git", ["push", "-uf", ORIGIN_NAME, currentBranch], {
      stdio: "inherit",
    })
    if (res.status !== 0) {
      console.log(
        styleText("red", `An error occurred above while pushing to remote ${ORIGIN_NAME}.`),
      )
      return
    }
  }

  console.log(styleText("green", "Done!"))
}
