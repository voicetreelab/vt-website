import { PageLayout, SharedLayout } from "./quartz/cfg"
import * as Component from "./quartz/components"

// Filter function for Explorer - hides tags and specific blog posts
// Note: Must be self-contained (no external variables) because it's serialized to client
const explorerFilterFn = (node: any) => {
  const hiddenSlugs = new Set([
    "blog/90-percent-token-reduction",
    "blog/From-RAG-to-PAG",
    "blog/Managing-Multiple-AI-Agents",
  ])
  return node.slugSegment !== "tags" && !(node.isFolder ? false : hiddenSlugs.has(node.slug))
}

// components shared across all pages
export const sharedPageComponents: SharedLayout = {
  head: Component.Head(),
  header: [],
  afterBody: [],
  footer: Component.Footer({
    links: {},
  }),
}

// Custom sort function for Explorer - sorts by priority frontmatter
const explorerSortFn = (a: any, b: any) => {
  // Sort by priority if available (lower number = higher priority)
  const priorityA = a.file?.frontmatter?.priority
  const priorityB = b.file?.frontmatter?.priority
  if (priorityA !== undefined && priorityB !== undefined) {
    return priorityA - priorityB
  }
  if (priorityA !== undefined) return -1
  if (priorityB !== undefined) return 1
  // Fall back to alphabetical for non-prioritized items
  if ((!a.isFolder && !b.isFolder) || (a.isFolder && b.isFolder)) {
    return a.displayName.localeCompare(b.displayName, undefined, {
      numeric: true,
      sensitivity: "base",
    })
  }
  if (!a.isFolder && b.isFolder) return 1
  return -1
}

// components for pages that display a single page (e.g. a single note)
export const defaultContentPageLayout: PageLayout = {
  beforeBody: [
    Component.ConditionalRender({
      component: Component.Breadcrumbs(),
      condition: (page) => page.fileData.slug !== "index",
    }),
    Component.ConditionalRender({
      component: Component.ArticleTitle(),
      condition: (page) => page.fileData.slug !== "index",
    }),
    Component.ConditionalRender({
      component: Component.ContentMeta(),
      condition: (page) => page.fileData.slug !== "index",
    }),
    Component.TagList(),
  ],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Flex({
      components: [
        {
          Component: Component.Search(),
          grow: true,
        },
        { Component: Component.Darkmode() },
      ],
    }),
    Component.Explorer({ sortFn: explorerSortFn, filterFn: explorerFilterFn }),
  ],
  right: [
    Component.ConditionalRender({
      component: Component.Graph(),
      condition: (page) => page.fileData.frontmatter?.hideGraph !== true,
    }),
    Component.DesktopOnly(Component.TableOfContents()),
    Component.Backlinks(),
  ],
}

// components for pages that display lists of pages  (e.g. tags or folders)
export const defaultListPageLayout: PageLayout = {
  beforeBody: [Component.Breadcrumbs(), Component.ArticleTitle(), Component.ContentMeta()],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Flex({
      components: [
        {
          Component: Component.Search(),
          grow: true,
        },
        { Component: Component.Darkmode() },
      ],
    }),
    Component.Explorer({ sortFn: explorerSortFn, filterFn: explorerFilterFn }),
  ],
  right: [],
}
