import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { pathToRoot, joinSegments } from "../util/path"

interface NavLink {
  label: string
  href: string
  external?: boolean
}

interface NavbarOptions {
  links: NavLink[]
  cta?: NavLink
}

const defaultOptions: NavbarOptions = {
  links: [
    { label: "Blog", href: "/blog" },
    { label: "Docs", href: "/docs" },
  ],
  cta: { label: "Download", href: "/download" },
}

export default ((opts?: Partial<NavbarOptions>) => {
  const options = { ...defaultOptions, ...opts }

  const Navbar: QuartzComponent = ({ fileData, cfg }: QuartzComponentProps) => {
    const baseDir = pathToRoot(fileData.slug!)
    const logoPath = joinSegments(baseDir, "static/logo-hand-clean.png")
    const title = cfg?.pageTitle ?? "Voicetree"

    return (
      <nav class="site-navbar">
        <div class="navbar-inner">
          <a href={baseDir} class="navbar-brand">
            <img src={logoPath} alt={`${title} Logo`} class="navbar-logo" />
            <span class="navbar-title">{title.toUpperCase()}.IO</span>
          </a>
          <div class="navbar-links">
            {options.links.map((link) => (
              <a
                href={link.external ? link.href : joinSegments(baseDir, link.href)}
                class="navbar-link"
                {...(link.external ? { target: "_blank", rel: "noopener" } : {})}
              >
                {link.label}
              </a>
            ))}
            {options.cta && (
              <a
                href={options.cta.external ? options.cta.href : joinSegments(baseDir, options.cta.href)}
                class="navbar-cta"
                {...(options.cta.external ? { target: "_blank", rel: "noopener" } : {})}
              >
                {options.cta.label}
              </a>
            )}
          </div>
        </div>
      </nav>
    )
  }

  Navbar.css = `
.site-navbar {
  width: 100%;
  border-bottom: 1px solid var(--lightgray);
  background: var(--light);
  position: sticky;
  top: 0;
  z-index: 99;
}

.navbar-inner {
  max-width: 860px;
  margin: 0 auto;
  padding: 0.7rem 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
}

.navbar-brand {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  text-decoration: none;
  flex-shrink: 0;
}

.navbar-logo {
  width: 36px;
  height: 36px;
  border-radius: 8px;
  object-fit: contain;
  margin: 0;
}

.navbar-title {
  font-size: 0.8rem;
  font-weight: 800;
  letter-spacing: 0.06em;
  color: var(--dark);
  border: 1.5px solid var(--gray);
  border-radius: 20px;
  padding: 0.25rem 0.75rem;
  white-space: nowrap;
}

.navbar-links {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

a.navbar-link {
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--darkgray);
  text-decoration: none;
  transition: color 0.15s ease;
  background: none;
  padding: 0;
}

a.navbar-link:hover {
  color: var(--dark);
}

a.navbar-cta {
  font-size: 0.85rem;
  font-weight: 700;
  color: #1d1d1d;
  background: #f5d547;
  border-radius: 6px;
  padding: 0.45rem 1rem;
  text-decoration: none;
  white-space: nowrap;
  transition: opacity 0.15s ease;
}

a.navbar-cta:hover {
  opacity: 0.85;
}

/* Dark mode */
[saved-theme="dark"] .navbar-cta {
  background: #c9a82a;
  color: #111;
}

/* Mobile: hide text links, keep logo + Download */
@media all and (max-width: 800px) {
  .navbar-inner {
    padding: 0.6rem 1rem;
  }

  .navbar-links {
    gap: 1rem;
  }

  a.navbar-link {
    display: none;
  }
}
`

  return Navbar
}) satisfies QuartzComponentConstructor
