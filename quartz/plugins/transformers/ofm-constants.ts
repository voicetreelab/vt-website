import { PhrasingContent, Paragraph } from "mdast"
import { toHast } from "mdast-util-to-hast"
import { toHtml } from "hast-util-to-html"

export interface Options {
  comments: boolean
  highlight: boolean
  wikilinks: boolean
  callouts: boolean
  mermaid: boolean
  parseTags: boolean
  parseArrows: boolean
  parseBlockReferences: boolean
  enableInHtmlEmbed: boolean
  enableYouTubeEmbed: boolean
  enableVideoEmbed: boolean
  enableCheckbox: boolean
  disableBrokenWikilinks: boolean
}

export const defaultOptions: Options = {
  comments: true,
  highlight: true,
  wikilinks: true,
  callouts: true,
  mermaid: true,
  parseTags: true,
  parseArrows: true,
  parseBlockReferences: true,
  enableInHtmlEmbed: false,
  enableYouTubeEmbed: true,
  enableVideoEmbed: true,
  enableCheckbox: false,
  disableBrokenWikilinks: false,
}

export const calloutMapping = {
  note: "note",
  abstract: "abstract",
  summary: "abstract",
  tldr: "abstract",
  info: "info",
  todo: "todo",
  tip: "tip",
  hint: "tip",
  important: "tip",
  success: "success",
  check: "success",
  done: "success",
  question: "question",
  help: "question",
  faq: "question",
  warning: "warning",
  attention: "warning",
  caution: "warning",
  failure: "failure",
  missing: "failure",
  fail: "failure",
  danger: "danger",
  error: "danger",
  bug: "bug",
  example: "example",
  quote: "quote",
  cite: "quote",
} as const

export const arrowMapping: Record<string, string> = {
  "->": "&rarr;",
  "-->": "&rArr;",
  "=>": "&rArr;",
  "==>": "&rArr;",
  "<-": "&larr;",
  "<--": "&lArr;",
  "<=": "&lArr;",
  "<==": "&lArr;",
}

export function canonicalizeCallout(calloutName: string): keyof typeof calloutMapping {
  const normalizedCallout = calloutName.toLowerCase() as keyof typeof calloutMapping
  // if callout is not recognized, make it a custom one
  return calloutMapping[normalizedCallout] ?? calloutName
}

export const externalLinkRegex = /^https?:\/\//i

export const arrowRegex = new RegExp(/(-{1,2}>|={1,2}>|<-{1,2}|<={1,2})/g)

// !?                 -> optional embedding
// \[\[               -> open brace
// ([^\[\]\|\#]+)     -> one or more non-special characters ([,],|, or #) (name)
// (#[^\[\]\|\#]+)?   -> # then one or more non-special characters (heading link)
// (\\?\|[^\[\]\#]+)? -> optional escape \ then | then zero or more non-special characters (alias)
export const wikilinkRegex = new RegExp(
  /!?\[\[([^\[\]\|\#\\]+)?(#+[^\[\]\|\#\\]+)?(\\?\|[^\[\]\#]*)?\]\]/g,
)

// ^\|([^\n])+\|\n(\|) -> matches the header row
// ( ?:?-{3,}:? ?\|)+  -> matches the header row separator
// (\|([^\n])+\|\n)+   -> matches the body rows
export const tableRegex = new RegExp(/^\|([^\n])+\|\n(\|)( ?:?-{3,}:? ?\|)+\n(\|([^\n])+\|\n?)+/gm)

// matches any wikilink, only used for escaping wikilinks inside tables
export const tableWikilinkRegex = new RegExp(/(!?\[\[[^\]]*?\]\]|\[\^[^\]]*?\])/g)

export const highlightRegex = new RegExp(/==([^=]+)==/g)
export const commentRegex = new RegExp(/%%[\s\S]*?%%/g)
// from https://github.com/escwxyz/remark-obsidian-callout/blob/main/src/index.ts
export const calloutRegex = new RegExp(/^\[\!([\w-]+)\|?(.+?)?\]([+-]?)/)
export const calloutLineRegex = new RegExp(/^> *\[\!\w+\|?.*?\][+-]?.*$/gm)
// (?<=^| )             -> a lookbehind assertion, tag should start be separated by a space or be the start of the line
// #(...)               -> capturing group, tag itself must start with #
// (?:[-_\p{L}\d\p{Z}])+       -> non-capturing group, non-empty string of (Unicode-aware) alpha-numeric characters and symbols, hyphens and/or underscores
// (?:\/[-_\p{L}\d\p{Z}]+)*)   -> non-capturing group, matches an arbitrary number of tag strings separated by "/"
export const tagRegex = new RegExp(
  /(?<=^| )#((?:[-_\p{L}\p{Emoji}\p{M}\d])+(?:\/[-_\p{L}\p{Emoji}\p{M}\d]+)*)/gu,
)
export const blockReferenceRegex = new RegExp(/\^([-_A-Za-z0-9]+)$/g)
export const ytLinkRegex = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/
export const ytPlaylistLinkRegex = /[?&]list=([^#?&]*)/
export const videoExtensionRegex = new RegExp(/\.(mp4|webm|ogg|avi|mov|flv|wmv|mkv|mpg|mpeg|3gp|m4v)$/)
export const wikilinkImageEmbedRegex = new RegExp(
  /^(?<alt>(?!^\d*x?\d*$).*?)?(\|?\s*?(?<width>\d+)(x(?<height>\d+))?)?$/,
)

export const mdastToHtml = (ast: PhrasingContent | Paragraph) => {
  const hast = toHast(ast, { allowDangerousHtml: true })!
  return toHtml(hast, { allowDangerousHtml: true })
}
