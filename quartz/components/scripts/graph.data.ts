import type { ContentDetails } from "../../plugins/emitters/contentIndex"
import type { NodeData, SimpleLinkData, LinkData } from "./graph.types"
import { FullSlug, SimpleSlug, simplifySlug } from "../../util/path"

interface GraphDataConfig {
  depth: number
  removeTags: string[]
  showTags: boolean
}

interface GraphDataResult {
  graphData: { nodes: NodeData[]; links: LinkData[] }
  neighbourhood: Set<SimpleSlug>
}

export function buildGraphData(
  slug: SimpleSlug,
  rawData: Map<SimpleSlug, ContentDetails>,
  config: GraphDataConfig,
): GraphDataResult {
  const { depth: initialDepth, showTags, removeTags } = config
  let depth = initialDepth

  const links: SimpleLinkData[] = []
  const tags: SimpleSlug[] = []
  const validLinks = new Set(rawData.keys())

  for (const [source, details] of rawData.entries()) {
    const outgoing = details.links ?? []

    for (const dest of outgoing) {
      if (validLinks.has(dest)) {
        links.push({ source: source, target: dest })
      }
    }

    if (showTags) {
      const localTags = details.tags
        .filter((tag) => !removeTags.includes(tag))
        .map((tag) => simplifySlug(("tags/" + tag) as FullSlug))

      tags.push(...localTags.filter((tag) => !tags.includes(tag)))

      for (const tag of localTags) {
        links.push({ source: source, target: tag })
      }
    }
  }

  const neighbourhood = new Set<SimpleSlug>()
  const wl: (SimpleSlug | "__SENTINEL")[] = [slug, "__SENTINEL"]
  if (depth >= 0) {
    while (depth >= 0 && wl.length > 0) {
      const cur = wl.shift()!
      if (cur === "__SENTINEL") {
        depth--
        wl.push("__SENTINEL")
      } else {
        neighbourhood.add(cur)
        const outgoing = links.filter((l) => l.source === cur)
        const incoming = links.filter((l) => l.target === cur)
        wl.push(...outgoing.map((l) => l.target), ...incoming.map((l) => l.source))
      }
    }
  } else {
    validLinks.forEach((id) => neighbourhood.add(id))
    if (showTags) tags.forEach((tag) => neighbourhood.add(tag))
  }

  const nodes = [...neighbourhood].map((url) => {
    const text = url.startsWith("tags/") ? "#" + url.substring(5) : (rawData.get(url)?.title ?? url)
    return {
      id: url,
      text,
      tags: rawData.get(url)?.tags ?? [],
    }
  })

  const graphData: { nodes: NodeData[]; links: LinkData[] } = {
    nodes,
    links: links
      .filter((l) => neighbourhood.has(l.source) && neighbourhood.has(l.target))
      .map((l) => ({
        source: nodes.find((n) => n.id === l.source)!,
        target: nodes.find((n) => n.id === l.target)!,
      })),
  }

  return { graphData, neighbourhood }
}
