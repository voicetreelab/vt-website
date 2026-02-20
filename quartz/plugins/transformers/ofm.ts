import { QuartzTransformerPlugin } from "../types"
import { Element, Root as HtmlRoot } from "hast"
import { splitAnchor } from "../../util/path"
import { JSResource, CSSResource } from "../../util/resources"
// @ts-ignore
import calloutScript from "../../components/scripts/callout.inline"
// @ts-ignore
import checkboxScript from "../../components/scripts/checkbox.inline"
// @ts-ignore
import mermaidScript from "../../components/scripts/mermaid.inline"
import mermaidStyle from "../../components/styles/mermaid.inline.scss"

import {
  Options,
  defaultOptions,
  commentRegex,
  calloutLineRegex,
  tableRegex,
  tableWikilinkRegex,
  wikilinkRegex,
  externalLinkRegex,
} from "./ofm-constants"
import { buildMarkdownPlugins } from "./ofm-markdown-plugins"
import { buildHtmlPlugins } from "./ofm-html-plugins"

export type { Options }
export { externalLinkRegex, wikilinkRegex, tableRegex, tableWikilinkRegex } from "./ofm-constants"
export { arrowRegex } from "./ofm-constants"

export const ObsidianFlavoredMarkdown: QuartzTransformerPlugin<Partial<Options>> = (userOpts) => {
  const opts = { ...defaultOptions, ...userOpts }

  return {
    name: "ObsidianFlavoredMarkdown",
    textTransform(_ctx, src) {
      // do comments at text level
      if (opts.comments) {
        src = src.replace(commentRegex, "")
      }

      // pre-transform blockquotes
      if (opts.callouts) {
        src = src.replace(calloutLineRegex, (value) => {
          // force newline after title of callout
          return value + "\n> "
        })
      }

      // pre-transform wikilinks (fix anchors to things that may contain illegal syntax e.g. codeblocks, latex)
      if (opts.wikilinks) {
        // replace all wikilinks inside a table first
        src = src.replace(tableRegex, (value) => {
          // escape all aliases and headers in wikilinks inside a table
          return value.replace(tableWikilinkRegex, (_value, raw) => {
            // const [raw]: (string | undefined)[] = capture
            let escaped = raw ?? ""
            escaped = escaped.replace("#", "\\#")
            // escape pipe characters if they are not already escaped
            escaped = escaped.replace(/((^|[^\\])(\\\\)*)\|/g, "$1\\|")

            return escaped
          })
        })

        // replace all other wikilinks
        src = src.replace(wikilinkRegex, (value, ...capture) => {
          const [rawFp, rawHeader, rawAlias]: (string | undefined)[] = capture

          const [fp, anchor] = splitAnchor(`${rawFp ?? ""}${rawHeader ?? ""}`)
          const blockRef = Boolean(rawHeader?.startsWith("#^")) ? "^" : ""
          const displayAnchor = anchor ? `#${blockRef}${anchor.trim().replace(/^#+/, "")}` : ""
          const displayAlias = rawAlias ?? rawHeader?.replace("#", "|") ?? ""
          const embedDisplay = value.startsWith("!") ? "!" : ""

          if (rawFp?.match(externalLinkRegex)) {
            return `${embedDisplay}[${displayAlias.replace(/^\|/, "")}](${rawFp})`
          }

          return `${embedDisplay}[[${fp}${displayAnchor}${displayAlias}]]`
        })
      }

      return src
    },
    markdownPlugins(ctx) {
      return buildMarkdownPlugins(opts, ctx)
    },
    htmlPlugins() {
      return buildHtmlPlugins(opts)
    },
    externalResources() {
      const js: JSResource[] = []
      const css: CSSResource[] = []

      if (opts.enableCheckbox) {
        js.push({
          script: checkboxScript,
          loadTime: "afterDOMReady",
          contentType: "inline",
        })
      }

      if (opts.callouts) {
        js.push({
          script: calloutScript,
          loadTime: "afterDOMReady",
          contentType: "inline",
        })
      }

      if (opts.mermaid) {
        js.push({
          script: mermaidScript,
          loadTime: "afterDOMReady",
          contentType: "inline",
          moduleType: "module",
        })

        css.push({
          content: mermaidStyle,
          inline: true,
        })
      }

      return { js, css }
    },
  }
}

declare module "vfile" {
  interface DataMap {
    blocks: Record<string, Element>
    htmlAst: HtmlRoot
    hasMermaidDiagram: boolean | undefined
  }
}
