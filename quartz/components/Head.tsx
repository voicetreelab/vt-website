import { i18n } from "../i18n"
import { FullSlug, getFileExtension, joinSegments, pathToRoot } from "../util/path"
import { CSSResourceToStyleElement, JSResourceToScriptElement } from "../util/resources"
import { googleFontHref, googleFontSubsetHref } from "../util/theme"
import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { unescapeHTML } from "../util/escape"
import { CustomOgImagesEmitterName } from "../plugins/emitters/ogImage"

// JSON-LD Schema for Organization
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Voicetree",
  "url": "https://voicetree.io",
  "logo": "https://voicetree.io/static/icon.png",
  "description": "An interactive graph-view for orchestrating coding agents. Your agents share the same memory graph and can recursively spawn subagents.",
  "email": "hello@voicetree.io",
  "sameAs": [
    "https://github.com/voicetreelab",
    "https://x.com/voicetreeio",
    "https://discord.gg/r2ZBtJ9zvk"
  ]
}

// JSON-LD Schema for SoftwareApplication
const softwareApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Voicetree",
  "applicationCategory": "DeveloperApplication",
  "operatingSystem": "macOS, Windows, Linux",
  "description": "An interactive graph-view where nodes are markdown notes or terminal-based agents. Agents share your memory graph, see nearby nodes as context, and can recursively spawn subagents.",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD",
    "availability": "https://schema.org/InStock"
  },
  "publisher": {
    "@type": "Organization",
    "name": "Voicetree"
  }
}

// Extract plain text from a hast node recursively
function extractTextContent(node: any): string {
  if (!node) return ""
  if (node.type === "text") return node.value || ""
  if (node.children && Array.isArray(node.children)) {
    return node.children.map(extractTextContent).join("")
  }
  return ""
}

// Build FAQPage JSON-LD schema from hast tree (h3 = question, following content = answer)
function buildFaqSchema(tree: any, pageUrl: string): object | null {
  const children = tree?.children
  if (!Array.isArray(children)) return null

  const faqItems: { question: string; answer: string }[] = []
  let i = 0

  while (i < children.length) {
    const node = children[i]
    if (node.type === "element" && node.tagName === "h3") {
      const question = extractTextContent(node).trim()
      const answerParts: string[] = []
      i++
      while (i < children.length) {
        const next = children[i]
        if (next.type === "element" && /^h[1-3]$/.test(next.tagName)) break
        const text = extractTextContent(next).trim()
        if (text) answerParts.push(text)
        i++
      }
      if (question && answerParts.length > 0) {
        faqItems.push({ question, answer: answerParts.join(" ") })
      }
    } else {
      i++
    }
  }

  if (faqItems.length === 0) return null

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqItems.map((item) => ({
      "@type": "Question",
      "name": item.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.answer,
      },
    })),
  }
}

export default (() => {
  const Head: QuartzComponent = ({
    cfg,
    fileData,
    externalResources,
    ctx,
    tree,
  }: QuartzComponentProps) => {
    const titleSuffix = cfg.pageTitleSuffix ?? ""
    const isHomepage = fileData.slug === "index"
    const pageTitle = fileData.frontmatter?.title ?? i18n(cfg.locale).propertyDefaults.title
    // Don't add suffix to homepage (it has its own full title with tagline)
    const title = isHomepage ? pageTitle : pageTitle + titleSuffix
    const description =
      fileData.frontmatter?.socialDescription ??
      fileData.frontmatter?.description ??
      unescapeHTML(fileData.description?.trim() ?? i18n(cfg.locale).propertyDefaults.description)

    const { css, js, additionalHead } = externalResources

    const url = new URL(`https://${cfg.baseUrl ?? "example.com"}`)
    const path = url.pathname as FullSlug
    const baseDir = fileData.slug === "404" ? path : pathToRoot(fileData.slug!)
    const iconPath = joinSegments(baseDir, "static/icon.png")

    // Url of current page
    const socialUrl =
      fileData.slug === "404" ? url.toString() : joinSegments(url.toString(), fileData.slug!)

    const usesCustomOgImage = ctx.cfg.plugins.emitters.some(
      (e) => e.name === CustomOgImagesEmitterName,
    )
    const ogImageDefaultPath = `https://${cfg.baseUrl}/static/og-image.png`

    return (
      <head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        {cfg.theme.cdnCaching && cfg.theme.fontOrigin === "googleFonts" && (
          <>
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" />
            <link rel="stylesheet" href={googleFontHref(cfg.theme)} />
            {cfg.theme.typography.title && (
              <link rel="stylesheet" href={googleFontSubsetHref(cfg.theme, cfg.pageTitle)} />
            )}
          </>
        )}
        <link rel="preconnect" href="https://cdnjs.cloudflare.com" crossOrigin="anonymous" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        <meta name="og:site_name" content={cfg.pageTitle}></meta>
        <meta property="og:title" content={title} />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta property="og:description" content={description} />
        <meta property="og:image:alt" content={description} />

        {!usesCustomOgImage && (
          <>
            <meta property="og:image" content={ogImageDefaultPath} />
            <meta property="og:image:url" content={ogImageDefaultPath} />
            <meta name="twitter:image" content={ogImageDefaultPath} />
            <meta
              property="og:image:type"
              content={`image/${getFileExtension(ogImageDefaultPath) ?? "png"}`}
            />
          </>
        )}

        {cfg.baseUrl && (
          <>
            <meta property="twitter:domain" content={cfg.baseUrl}></meta>
            <meta property="og:url" content={socialUrl}></meta>
            <meta property="twitter:url" content={socialUrl}></meta>
          </>
        )}

        <link rel="icon" type="image/png" sizes="32x32" href={joinSegments(baseDir, "static/favicon-32x32.png")} />
        <link rel="icon" href={iconPath} />
        <meta name="description" content={description} />
        <link rel="canonical" href={socialUrl} />
        <meta name="generator" content="Quartz" />

        {/* JSON-LD Structured Data for SEO and AI Search */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareApplicationSchema) }}
        />
        {fileData.slug === "blog/more/FAQ" && (() => {
          const faqSchema = buildFaqSchema(tree, socialUrl)
          return faqSchema ? (
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
            />
          ) : null
        })()}

        {css.map((resource) => CSSResourceToStyleElement(resource, true))}
        {js
          .filter((resource) => resource.loadTime === "beforeDOMReady")
          .map((res) => JSResourceToScriptElement(res, true))}
        {additionalHead.map((resource) => {
          if (typeof resource === "function") {
            return resource(fileData)
          } else {
            return resource
          }
        })}
      </head>
    )
  }

  return Head
}) satisfies QuartzComponentConstructor
