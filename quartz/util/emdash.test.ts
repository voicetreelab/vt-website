import test from "node:test"
import assert from "node:assert"
import fs from "node:fs"
import path from "node:path"

function getMarkdownFiles(dir: string): string[] {
  const results: string[] = []
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      results.push(...getMarkdownFiles(full))
    } else if (entry.name.endsWith(".md")) {
      results.push(full)
    }
  }
  return results
}

test("content files must not contain em dashes", () => {
  const contentDir = path.resolve(import.meta.dirname, "../../content")
  const files = getMarkdownFiles(contentDir)
  const violations: string[] = []

  for (const file of files) {
    const content = fs.readFileSync(file, "utf-8")
    const lines = content.split("\n")
    for (let i = 0; i < lines.length; i++) {
      if (lines[i].includes("\u2014")) {
        const rel = path.relative(contentDir, file)
        violations.push(`  ${rel}:${i + 1}: ${lines[i].trim()}`)
      }
    }
  }

  assert.strictEqual(
    violations.length,
    0,
    `Found em dashes (\u2014) in content files. Use colons, semicolons, or commas instead.\n\n${violations.join("\n")}`,
  )
})
