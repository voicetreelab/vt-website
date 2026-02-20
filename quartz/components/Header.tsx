import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"

const Header: QuartzComponent = ({ children }: QuartzComponentProps) => {
  return children.length > 0 ? <header>{children}</header> : null
}

Header.css = `
header {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  margin: 0;
  gap: 0;
}
`

export default (() => Header) satisfies QuartzComponentConstructor
