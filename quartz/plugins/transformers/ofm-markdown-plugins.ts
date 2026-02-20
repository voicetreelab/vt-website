import {
  Root,
  Html,
  BlockContent,
  DefinitionContent,
  Paragraph,
  Code,
} from "mdast"
import { ReplaceFunction, findAndReplace as mdastFindReplace } from "mdast-util-find-and-replace"
import { SKIP, visit } from "unist-util-visit"
import path from "path"
import { FilePath, pathToRoot, slugTag, slugifyFilePath } from "../../util/path"
import { capitalize } from "../../util/lang"
import { PluggableList } from "unified"
import { BuildCtx } from "../../util/ctx"

import {
  Options,
  arrowMapping,
  arrowRegex,
  calloutRegex,
  canonicalizeCallout,
  highlightRegex,
  mdastToHtml,
  tagRegex,
  videoExtensionRegex,
  wikilinkImageEmbedRegex,
  wikilinkRegex,
} from "./ofm-constants"

export function buildMarkdownPlugins(opts: Options, ctx: BuildCtx): PluggableList {
  const plugins: PluggableList = []

  // regex replacements
  plugins.push(() => {
    return (tree: Root, file) => {
      const replacements: [RegExp, string | ReplaceFunction][] = []
      const base = pathToRoot(file.data.slug!)

      if (opts.wikilinks) {
        replacements.push([
          wikilinkRegex,
          (value: string, ...capture: string[]) => {
            let [rawFp, rawHeader, rawAlias] = capture
            const fp = rawFp?.trim() ?? ""
            const anchor = rawHeader?.trim() ?? ""
            const alias: string | undefined = rawAlias?.slice(1).trim()

            // embed cases
            if (value.startsWith("!")) {
              const ext: string = path.extname(fp).toLowerCase()
              const url = slugifyFilePath(fp as FilePath)
              if ([".png", ".jpg", ".jpeg", ".gif", ".bmp", ".svg", ".webp"].includes(ext)) {
                const match = wikilinkImageEmbedRegex.exec(alias ?? "")
                const alt = match?.groups?.alt ?? ""
                const width = match?.groups?.width ?? "auto"
                const height = match?.groups?.height ?? "auto"
                return {
                  type: "image",
                  url,
                  data: {
                    hProperties: {
                      width,
                      height,
                      alt,
                    },
                  },
                }
              } else if ([".mp4", ".webm", ".ogv", ".mov", ".mkv"].includes(ext)) {
                return {
                  type: "html",
                  value: `<video src="${url}" controls></video>`,
                }
              } else if (
                [".mp3", ".webm", ".wav", ".m4a", ".ogg", ".3gp", ".flac"].includes(ext)
              ) {
                return {
                  type: "html",
                  value: `<audio src="${url}" controls></audio>`,
                }
              } else if ([".pdf"].includes(ext)) {
                return {
                  type: "html",
                  value: `<iframe src="${url}" class="pdf"></iframe>`,
                }
              } else {
                const block = anchor
                return {
                  type: "html",
                  data: { hProperties: { transclude: true } },
                  value: `<blockquote class="transclude" data-url="${url}" data-block="${block}" data-embed-alias="${alias}"><a href="${
                    url + anchor
                  }" class="transclude-inner">Transclude of ${url}${block}</a></blockquote>`,
                }
              }

              // otherwise, fall through to regular link
            }

            // treat as broken link if slug not in ctx.allSlugs
            if (opts.disableBrokenWikilinks) {
              const slug = slugifyFilePath(fp as FilePath)
              const exists = ctx.allSlugs && ctx.allSlugs.includes(slug)
              if (!exists) {
                return {
                  type: "html",
                  value: `<a class=\"internal broken\">${alias ?? fp}</a>`,
                }
              }
            }

            // internal link
            const url = fp + anchor

            return {
              type: "link",
              url,
              children: [
                {
                  type: "text",
                  value: alias ?? fp,
                },
              ],
            }
          },
        ])
      }

      if (opts.highlight) {
        replacements.push([
          highlightRegex,
          (_value: string, ...capture: string[]) => {
            const [inner] = capture
            return {
              type: "html",
              value: `<span class="text-highlight">${inner}</span>`,
            }
          },
        ])
      }

      if (opts.parseArrows) {
        replacements.push([
          arrowRegex,
          (value: string, ..._capture: string[]) => {
            const maybeArrow = arrowMapping[value]
            if (maybeArrow === undefined) return SKIP
            return {
              type: "html",
              value: `<span>${maybeArrow}</span>`,
            }
          },
        ])
      }

      if (opts.parseTags) {
        replacements.push([
          tagRegex,
          (_value: string, tag: string) => {
            // Check if the tag only includes numbers and slashes
            if (/^[\/\d]+$/.test(tag)) {
              return false
            }

            tag = slugTag(tag)
            if (file.data.frontmatter) {
              const noteTags = file.data.frontmatter.tags ?? []
              file.data.frontmatter.tags = [...new Set([...noteTags, tag])]
            }

            return {
              type: "link",
              url: base + `/tags/${tag}`,
              data: {
                hProperties: {
                  className: ["tag-link"],
                },
              },
              children: [
                {
                  type: "text",
                  value: tag,
                },
              ],
            }
          },
        ])
      }

      if (opts.enableInHtmlEmbed) {
        visit(tree, "html", (node: Html) => {
          for (const [regex, replace] of replacements) {
            if (typeof replace === "string") {
              node.value = node.value.replace(regex, replace)
            } else {
              node.value = node.value.replace(regex, (substring: string, ...args) => {
                const replaceValue = replace(substring, ...args)
                if (typeof replaceValue === "string") {
                  return replaceValue
                } else if (Array.isArray(replaceValue)) {
                  return replaceValue.map(mdastToHtml).join("")
                } else if (typeof replaceValue === "object" && replaceValue !== null) {
                  return mdastToHtml(replaceValue)
                } else {
                  return substring
                }
              })
            }
          }
        })
      }
      mdastFindReplace(tree, replacements)
    }
  })

  if (opts.enableVideoEmbed) {
    plugins.push(() => {
      return (tree: Root, _file) => {
        visit(tree, "image", (node, index, parent) => {
          if (parent && index != undefined && videoExtensionRegex.test(node.url)) {
            const newNode: Html = {
              type: "html",
              value: `<video controls src="${node.url}"></video>`,
            }

            parent.children.splice(index, 1, newNode)
            return SKIP
          }
        })
      }
    })
  }

  if (opts.callouts) {
    plugins.push(() => {
      return (tree: Root, _file) => {
        visit(tree, "blockquote", (node) => {
          if (node.children.length === 0) {
            return
          }

          // find first line and callout content
          const [firstChild, ...calloutContent] = node.children
          if (firstChild.type !== "paragraph" || firstChild.children[0]?.type !== "text") {
            return
          }

          const text = firstChild.children[0].value
          const restOfTitle = firstChild.children.slice(1)
          const [firstLine, ...remainingLines] = text.split("\n")
          const remainingText = remainingLines.join("\n")

          const match = firstLine.match(calloutRegex)
          if (match && match.input) {
            const [calloutDirective, typeString, calloutMetaData, collapseChar] = match
            const calloutType = canonicalizeCallout(typeString.toLowerCase())
            const collapse = collapseChar === "+" || collapseChar === "-"
            const defaultState = collapseChar === "-" ? "collapsed" : "expanded"
            const titleContent = match.input.slice(calloutDirective.length).trim()
            const useDefaultTitle = titleContent === "" && restOfTitle.length === 0
            const titleNode: Paragraph = {
              type: "paragraph",
              children: [
                {
                  type: "text",
                  value: useDefaultTitle
                    ? capitalize(typeString).replace(/-/g, " ")
                    : titleContent + " ",
                },
                ...restOfTitle,
              ],
            }
            const title = mdastToHtml(titleNode)

            const toggleIcon = `<div class="fold-callout-icon"></div>`

            const titleHtml: Html = {
              type: "html",
              value: `<div
                  class="callout-title"
                >
                  <div class="callout-icon"></div>
                  <div class="callout-title-inner">${title}</div>
                  ${collapse ? toggleIcon : ""}
                </div>`,
            }

            const blockquoteContent: (BlockContent | DefinitionContent)[] = [titleHtml]
            if (remainingText.length > 0) {
              blockquoteContent.push({
                type: "paragraph",
                children: [
                  {
                    type: "text",
                    value: remainingText,
                  },
                ],
              })
            }

            // For the rest of the MD callout elements other than the title, wrap them with
            // two nested HTML <div>s (use some hacked mdhast component to achieve this) of
            // class `callout-content` and `callout-content-inner` respectively for
            // grid-based collapsible animation.
            if (calloutContent.length > 0) {
              node.children = [
                node.children[0],
                {
                  data: { hProperties: { className: ["callout-content"] }, hName: "div" },
                  type: "blockquote",
                  children: [...calloutContent],
                },
              ]
            }

            // replace first line of blockquote with title and rest of the paragraph text
            node.children.splice(0, 1, ...blockquoteContent)

            const classNames = ["callout", calloutType]
            if (collapse) {
              classNames.push("is-collapsible")
            }
            if (defaultState === "collapsed") {
              classNames.push("is-collapsed")
            }

            // add properties to base blockquote
            node.data = {
              hProperties: {
                ...(node.data?.hProperties ?? {}),
                className: classNames.join(" "),
                "data-callout": calloutType,
                "data-callout-fold": collapse,
                "data-callout-metadata": calloutMetaData,
              },
            }
          }
        })
      }
    })
  }

  if (opts.mermaid) {
    plugins.push(() => {
      return (tree: Root, file) => {
        visit(tree, "code", (node: Code) => {
          if (node.lang === "mermaid") {
            file.data.hasMermaidDiagram = true
            node.data = {
              hProperties: {
                className: ["mermaid"],
                "data-clipboard": JSON.stringify(node.value),
              },
            }
          }
        })
      }
    })
  }

  return plugins
}
