import { popContentFolder } from "./helpers.js"
import { resolveContentPath } from "./resolveContentPath.js"

/**
 * Handles `npx quartz restore`
 * @param {*} argv arguments for `restore`
 */
export async function handleRestore(argv) {
  const contentFolder = resolveContentPath(argv.directory)
  await popContentFolder(contentFolder)
}
