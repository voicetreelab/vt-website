// @ts-ignore
import darkmodeScript from "./scripts/darkmode.inline"
import styles from "./styles/darkmode.scss"
import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"

// Dark mode is always on — no toggle button rendered.
// Component exists solely to inject the beforeDOMLoaded script that forces dark theme.
const Darkmode: QuartzComponent = ({}: QuartzComponentProps) => {
  return <div style="display:none" />
}

Darkmode.beforeDOMLoaded = darkmodeScript
Darkmode.css = styles

export default (() => Darkmode) satisfies QuartzComponentConstructor
