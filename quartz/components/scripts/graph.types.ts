import type { SimulationNodeDatum, SimulationLinkDatum } from "d3"
import type { Text, Graphics } from "pixi.js"
import type { SimpleSlug } from "../../util/path"

export type GraphicsInfo = {
  color: string
  gfx: Graphics
  alpha: number
  active: boolean
}

export type NodeData = {
  id: SimpleSlug
  text: string
  tags: string[]
} & SimulationNodeDatum

export type SimpleLinkData = {
  source: SimpleSlug
  target: SimpleSlug
}

export type LinkData = {
  source: NodeData
  target: NodeData
} & SimulationLinkDatum<NodeData>

export type LinkRenderData = GraphicsInfo & {
  simulationData: LinkData
}

export type NodeRenderData = GraphicsInfo & {
  simulationData: NodeData
  label: Text
}

export type TweenNode = {
  update: (time: number) => void
  stop: () => void
}
