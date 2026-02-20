import { Element, Literal, Root as HtmlRoot } from "hast"
import rehypeRaw from "rehype-raw"
import { visit } from "unist-util-visit"
import { PluggableList } from "unified"

import {
  Options,
  blockReferenceRegex,
  ytLinkRegex,
  ytPlaylistLinkRegex,
} from "./ofm-constants"

export function buildHtmlPlugins(opts: Options): PluggableList {
  const plugins: PluggableList = [rehypeRaw]

  if (opts.parseBlockReferences) {
    plugins.push(() => {
      const inlineTagTypes = new Set(["p", "li"])
      const blockTagTypes = new Set(["blockquote"])
      return (tree: HtmlRoot, file) => {
        file.data.blocks = {}

        visit(tree, "element", (node, index, parent) => {
          if (blockTagTypes.has(node.tagName)) {
            const nextChild = parent?.children.at(index! + 2) as Element
            if (nextChild && nextChild.tagName === "p") {
              const text = nextChild.children.at(0) as Literal
              if (text && text.value && text.type === "text") {
                const matches = text.value.match(blockReferenceRegex)
                if (matches && matches.length >= 1) {
                  parent!.children.splice(index! + 2, 1)
                  const block = matches[0].slice(1)

                  if (!Object.keys(file.data.blocks!).includes(block)) {
                    node.properties = {
                      ...node.properties,
                      id: block,
                    }
                    file.data.blocks![block] = node
                  }
                }
              }
            }
          } else if (inlineTagTypes.has(node.tagName)) {
            const last = node.children.at(-1) as Literal
            if (last && last.value && typeof last.value === "string") {
              const matches = last.value.match(blockReferenceRegex)
              if (matches && matches.length >= 1) {
                last.value = last.value.slice(0, -matches[0].length)
                const block = matches[0].slice(1)

                if (last.value === "") {
                  // this is an inline block ref but the actual block
                  // is the previous element above it
                  let idx = (index ?? 1) - 1
                  while (idx >= 0) {
                    const element = parent?.children.at(idx)
                    if (!element) break
                    if (element.type !== "element") {
                      idx -= 1
                    } else {
                      if (!Object.keys(file.data.blocks!).includes(block)) {
                        element.properties = {
                          ...element.properties,
                          id: block,
                        }
                        file.data.blocks![block] = element
                      }
                      return
                    }
                  }
                } else {
                  // normal paragraph transclude
                  if (!Object.keys(file.data.blocks!).includes(block)) {
                    node.properties = {
                      ...node.properties,
                      id: block,
                    }
                    file.data.blocks![block] = node
                  }
                }
              }
            }
          }
        })

        file.data.htmlAst = tree
      }
    })
  }

  if (opts.enableYouTubeEmbed) {
    plugins.push(() => {
      return (tree: HtmlRoot) => {
        visit(tree, "element", (node) => {
          if (node.tagName === "img" && typeof node.properties.src === "string") {
            const match = node.properties.src.match(ytLinkRegex)
            const videoId = match && match[2].length == 11 ? match[2] : null
            const playlistId = node.properties.src.match(ytPlaylistLinkRegex)?.[1]
            if (videoId) {
              // YouTube video (with optional playlist)
              node.tagName = "iframe"
              node.properties = {
                class: "external-embed youtube",
                allow: "fullscreen",
                frameborder: 0,
                width: "600px",
                src: playlistId
                  ? `https://www.youtube.com/embed/${videoId}?list=${playlistId}`
                  : `https://www.youtube.com/embed/${videoId}`,
              }
            } else if (playlistId) {
              // YouTube playlist only.
              node.tagName = "iframe"
              node.properties = {
                class: "external-embed youtube",
                allow: "fullscreen",
                frameborder: 0,
                width: "600px",
                src: `https://www.youtube.com/embed/videoseries?list=${playlistId}`,
              }
            }
          }
        })
      }
    })
  }

  if (opts.enableCheckbox) {
    plugins.push(() => {
      return (tree: HtmlRoot, _file) => {
        visit(tree, "element", (node) => {
          if (node.tagName === "input" && node.properties.type === "checkbox") {
            const isChecked = node.properties?.checked ?? false
            node.properties = {
              type: "checkbox",
              disabled: false,
              checked: isChecked,
              class: "checkbox-toggle",
            }
          }
        })
      }
    })
  }

  if (opts.mermaid) {
    plugins.push(() => {
      return (tree: HtmlRoot, _file) => {
        visit(tree, "element", (node: Element, _idx, parent) => {
          if (
            node.tagName === "code" &&
            ((node.properties?.className ?? []) as string[])?.includes("mermaid")
          ) {
            parent!.children = [
              {
                type: "element",
                tagName: "button",
                properties: {
                  className: ["expand-button"],
                  "aria-label": "Expand mermaid diagram",
                  "data-view-component": true,
                },
                children: [
                  {
                    type: "element",
                    tagName: "svg",
                    properties: {
                      width: 16,
                      height: 16,
                      viewBox: "0 0 16 16",
                      fill: "currentColor",
                    },
                    children: [
                      {
                        type: "element",
                        tagName: "path",
                        properties: {
                          fillRule: "evenodd",
                          d: "M3.72 3.72a.75.75 0 011.06 1.06L2.56 7h10.88l-2.22-2.22a.75.75 0 011.06-1.06l3.5 3.5a.75.75 0 010 1.06l-3.5 3.5a.75.75 0 11-1.06-1.06l2.22-2.22H2.56l2.22 2.22a.75.75 0 11-1.06 1.06l-3.5-3.5a.75.75 0 010-1.06l3.5-3.5z",
                        },
                        children: [],
                      },
                    ],
                  },
                ],
              },
              node,
              {
                type: "element",
                tagName: "div",
                properties: { id: "mermaid-container", role: "dialog" },
                children: [
                  {
                    type: "element",
                    tagName: "div",
                    properties: { id: "mermaid-space" },
                    children: [
                      {
                        type: "element",
                        tagName: "div",
                        properties: { className: ["mermaid-content"] },
                        children: [],
                      },
                    ],
                  },
                ],
              },
            ]
          }
        })
      }
    })
  }

  return plugins
}
