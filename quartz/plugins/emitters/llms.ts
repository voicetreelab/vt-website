/// <reference types="node" />
import fs from "fs"
import { FilePath, FullSlug, joinSegments } from "../../util/path"
import { GlobalConfiguration } from "../../cfg"
import { QuartzEmitterPlugin } from "../types"
import { write } from "./helpers"

interface PageEntry {
  slug: string
  title: string
  description: string
  /** Plain text for description fallback */
  text: string
  /** Raw markdown source (frontmatter stripped) for llms-full.txt */
  rawMarkdown: string
}

interface Section {
  heading: string
  pages: PageEntry[]
}

/** VFile data fields used by this emitter (augmented by other Quartz plugins) */
interface QuartzVFileData {
  slug?: FullSlug
  filePath?: FilePath
  text?: string
  description?: string
  frontmatter?: { title: string; [key: string]: unknown }
}

/** Slugs to exclude — thin index pages and tag pages add no value for agents */
function shouldInclude(slug: string): boolean {
  if (slug === "tags" || slug.indexOf("tags/") === 0) return false
  if (slug === "blog/more" || slug === "blog/more/index") return false
  if (slug === "blog/more/questions" || slug === "blog/more/questions/index") return false
  return true
}

function categorizePages(pages: PageEntry[]): Section[] {
  const core: PageEntry[] = []
  const docs: PageEntry[] = []
  const blog: PageEntry[] = []
  const faqAndQuestions: PageEntry[] = []

  for (const page of pages) {
    const slug = page.slug
    if (slug.indexOf("docs/") === 0) {
      docs.push(page)
    } else if (slug === "blog/more/FAQ" || slug.indexOf("blog/more/questions/") === 0) {
      faqAndQuestions.push(page)
    } else if (slug.indexOf("blog/") === 0) {
      blog.push(page)
    } else {
      core.push(page)
    }
  }

  const slugOrder = (a: PageEntry, b: PageEntry) => a.slug.localeCompare(b.slug)
  core.sort(slugOrder)
  docs.sort(slugOrder)
  blog.sort(slugOrder)
  faqAndQuestions.sort((a, b) => {
    if (a.slug === "blog/more/FAQ") return -1
    if (b.slug === "blog/more/FAQ") return 1
    return a.slug.localeCompare(b.slug)
  })

  const sections: Section[] = []
  if (core.length > 0) sections.push({ heading: "Core", pages: core })
  if (docs.length > 0) sections.push({ heading: "Documentation", pages: docs })
  if (blog.length > 0) sections.push({ heading: "Blog", pages: blog })
  if (faqAndQuestions.length > 0) sections.push({ heading: "FAQ & Questions", pages: faqAndQuestions })
  return sections
}

function pageUrl(baseUrl: string, slug: string): string {
  const simplified = slug === "index" ? "" : slug
  return `https://${joinSegments(baseUrl, simplified)}`
}

/** Strip YAML frontmatter (between --- markers) from markdown source */
function stripFrontmatter(source: string): string {
  const trimmed = source.replace(/^\s+/, "")
  if (trimmed.indexOf("---") !== 0) return source
  const end = trimmed.indexOf("---", 3)
  if (end === -1) return source
  return trimmed.slice(end + 3).replace(/^\s+/, "")
}

function generateLlmsTxt(cfg: GlobalConfiguration, pages: PageEntry[]): string {
  const base = cfg.baseUrl ?? ""
  const sections = categorizePages(pages)

  const lines: string[] = [
    "# Voicetree",
    "",
    "> An infinite canvas for orchestrating coding agents. Flow-state context engineering for developers.",
    "",
    "Voicetree is a spatial IDE for multi-agent orchestration. It organizes project context as an interactive graph of markdown files and terminals, letting developers visually manage multiple AI coding agents working in parallel.",
    "",
    "## Core Features",
    "- Visual agent orchestration: every agent sits next to its task, planning docs, and progress updates",
    "- Task decomposition: break complex work into isolated subtasks with execution order and parallelization",
    "- Transparent subagent spawning: agents spawn visibly on the canvas in their own terminals",
    "- Context preservation: no context loss between sessions, spatial navigation of project state",
    "- Local-first: everything stored on-device as markdown files",
    "- Token efficiency: context pruning leads to ~60% fewer input tokens",
    "",
    "## Links",
    `- Website: https://${base}`,
    `- Docs: https://${joinSegments(base, "docs/How-it-works")}`,
    `- Getting Started: https://${joinSegments(base, "docs/Getting-started-with-obsidian-vaults")}`,
    "- GitHub: https://github.com/voicetreelab/voicetree",
    "- Discord: https://discord.gg/voicetree",
    "- Contact: hello@voicetree.io",
    `- Full content: https://${joinSegments(base, "llms-full.txt")}`,
    "",
    "## Pages",
  ]

  for (const section of sections) {
    lines.push("")
    lines.push(`### ${section.heading}`)
    for (const page of section.pages) {
      const url = pageUrl(base, page.slug)
      const desc = page.description ? `\n  ${page.description}` : ""
      lines.push(`- ${page.title}: ${url}${desc}`)
    }
  }

  return lines.join("\n") + "\n"
}

function generateLlmsFullTxt(cfg: GlobalConfiguration, pages: PageEntry[]): string {
  const base = cfg.baseUrl ?? ""
  const sections = categorizePages(pages)
  const allPages: PageEntry[] = []
  for (const s of sections) {
    for (const p of s.pages) {
      allPages.push(p)
    }
  }

  const lines: string[] = [
    "# Voicetree",
    "",
    "> An infinite canvas for orchestrating coding agents. Flow-state context engineering for developers.",
    "",
    "Voicetree is a spatial IDE for multi-agent orchestration. It organizes project context as an interactive graph of markdown files and terminals, letting developers visually manage multiple AI coding agents working in parallel.",
    "",
    "## Core Features",
    "- Visual agent orchestration: every agent sits next to its task, planning docs, and progress updates",
    "- Task decomposition: break complex work into isolated subtasks with execution order and parallelization",
    "- Transparent subagent spawning: agents spawn visibly on the canvas in their own terminals",
    "- Context preservation: no context loss between sessions, spatial navigation of project state",
    "- Local-first: everything stored on-device as markdown files",
    "- Token efficiency: context pruning leads to ~60% fewer input tokens",
    "",
    "## Links",
    `- Website: https://${base}`,
    `- Docs: https://${joinSegments(base, "docs/How-it-works")}`,
    `- Getting Started: https://${joinSegments(base, "docs/Getting-started-with-obsidian-vaults")}`,
    "- GitHub: https://github.com/voicetreelab/voicetree",
    "- Discord: https://discord.gg/voicetree",
    "- Contact: hello@voicetree.io",
  ]

  for (const page of allPages) {
    const url = pageUrl(base, page.slug)
    lines.push("")
    lines.push("---")
    lines.push("")
    lines.push(`## ${page.title}`)
    lines.push(`URL: ${url}`)
    lines.push("")
    lines.push(page.rawMarkdown)
  }

  return lines.join("\n") + "\n"
}

export const LLMsIndex: QuartzEmitterPlugin = () => ({
  name: "LLMsIndex",
  async *emit(ctx, content) {
    const cfg = ctx.cfg.configuration
    const pages: PageEntry[] = []

    for (const [_tree, file] of content) {
      const data = file.data as QuartzVFileData
      const slug = String(data.slug ?? "")
      const text = String(data.text ?? "")

      if (!text || text === "") continue
      if (!shouldInclude(slug)) continue

      // Read raw markdown source and strip frontmatter for llms-full.txt
      let rawMarkdown = text
      const filePath = data.filePath
      if (filePath) {
        try {
          const source = await fs.promises.readFile(String(filePath), "utf-8")
          rawMarkdown = stripFrontmatter(source)
        } catch {
          // Fall back to plain text if source file can't be read
        }
      }

      pages.push({
        slug,
        title: data.frontmatter?.title ?? slug,
        description: String(data.description ?? ""),
        text,
        rawMarkdown,
      })
    }

    yield write({
      ctx,
      content: generateLlmsTxt(cfg, pages),
      slug: "llms" as FullSlug,
      ext: ".txt",
    })

    yield write({
      ctx,
      content: generateLlmsFullTxt(cfg, pages),
      slug: "llms-full" as FullSlug,
      ext: ".txt",
    })
  },
  async *partialEmit(ctx, content) {
    yield* this.emit(ctx, content, undefined as unknown)
  },
})
