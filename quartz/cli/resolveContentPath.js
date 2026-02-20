import path from "path"
import { cwd } from "./constants.js"

/**
 * Resolve content directory path
 * @param contentPath path to resolve
 */
export function resolveContentPath(contentPath) {
  if (path.isAbsolute(contentPath)) return path.relative(cwd, contentPath)
  return path.join(cwd, contentPath)
}
