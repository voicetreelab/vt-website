import { pathToRoot } from "../util/path"
import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { classNames } from "../util/lang"
import { i18n } from "../i18n"
import { joinSegments } from "../util/path"

const PageTitle: QuartzComponent = ({ fileData, cfg, displayClass }: QuartzComponentProps) => {
  const title = cfg?.pageTitle ?? i18n(cfg.locale).propertyDefaults.title
  const baseDir = pathToRoot(fileData.slug!)
  const logoPath = joinSegments(baseDir, "static/tree.png")
  return (
    <div class={classNames(displayClass, "page-title-container")}>
      <a href={baseDir} class="page-title-link">
        <img src={logoPath} alt="Voicetree Logo" class="page-logo" />
        <h2 class="page-title">{title}</h2>
      </a>
    </div>
  )
}

PageTitle.css = `
.page-title-container {
  margin: 0;
}

.page-title-link {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  text-decoration: none;
}

.page-logo {
  width: 48px;
  height: 48px;
  object-fit: contain;
}

.page-title {
  font-size: 1.75rem;
  margin: 0;
  font-family: var(--titleFont);
}
`

export default (() => PageTitle) satisfies QuartzComponentConstructor
