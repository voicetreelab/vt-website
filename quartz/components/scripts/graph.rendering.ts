import { Group as TweenGroup, Tween as Tweened } from "@tweenjs/tween.js"
import type { Text, Graphics } from "pixi.js"
import type { NodeRenderData, LinkRenderData, TweenNode } from "./graph.types"

export interface GraphRenderState {
  hoveredNodeId: string | null
  hoveredNeighbours: Set<string>
  nodeRenderData: NodeRenderData[]
  linkRenderData: LinkRenderData[]
  computedStyleMap: Record<string, string>
  tweens: Map<string, TweenNode>
  focusOnHover: boolean
  scale: number
}

export function updateHoverInfo(state: GraphRenderState, newHoveredId: string | null) {
  state.hoveredNodeId = newHoveredId

  if (newHoveredId === null) {
    state.hoveredNeighbours = new Set()
    for (const n of state.nodeRenderData) {
      n.active = false
    }

    for (const l of state.linkRenderData) {
      l.active = false
    }
  } else {
    state.hoveredNeighbours = new Set()
    for (const l of state.linkRenderData) {
      const linkData = l.simulationData
      if (linkData.source.id === newHoveredId || linkData.target.id === newHoveredId) {
        state.hoveredNeighbours.add(linkData.source.id)
        state.hoveredNeighbours.add(linkData.target.id)
      }

      l.active = linkData.source.id === newHoveredId || linkData.target.id === newHoveredId
    }

    for (const n of state.nodeRenderData) {
      n.active = state.hoveredNeighbours.has(n.simulationData.id)
    }
  }
}

export function renderLinks(state: GraphRenderState) {
  state.tweens.get("link")?.stop()
  const tweenGroup = new TweenGroup()

  for (const l of state.linkRenderData) {
    let alpha = 1

    if (state.hoveredNodeId) {
      alpha = l.active ? 1 : 0.2
    }

    l.color = l.active ? state.computedStyleMap["--gray"] : state.computedStyleMap["--lightgray"]
    tweenGroup.add(new Tweened<LinkRenderData>(l).to({ alpha }, 200))
  }

  tweenGroup.getAll().forEach((tw) => tw.start())
  state.tweens.set("link", {
    update: tweenGroup.update.bind(tweenGroup),
    stop() {
      tweenGroup.getAll().forEach((tw) => tw.stop())
    },
  })
}

export function renderLabels(state: GraphRenderState) {
  state.tweens.get("label")?.stop()
  const tweenGroup = new TweenGroup()

  const defaultScale = 1 / state.scale
  const activeScale = defaultScale * 1.1
  for (const n of state.nodeRenderData) {
    const nodeId = n.simulationData.id

    if (state.hoveredNodeId === nodeId) {
      tweenGroup.add(
        new Tweened<Text>(n.label).to(
          {
            alpha: 1,
            scale: { x: activeScale, y: activeScale },
          },
          100,
        ),
      )
    } else {
      tweenGroup.add(
        new Tweened<Text>(n.label).to(
          {
            alpha: n.label.alpha,
            scale: { x: defaultScale, y: defaultScale },
          },
          100,
        ),
      )
    }
  }

  tweenGroup.getAll().forEach((tw) => tw.start())
  state.tweens.set("label", {
    update: tweenGroup.update.bind(tweenGroup),
    stop() {
      tweenGroup.getAll().forEach((tw) => tw.stop())
    },
  })
}

export function renderNodes(state: GraphRenderState) {
  state.tweens.get("hover")?.stop()

  const tweenGroup = new TweenGroup()
  for (const n of state.nodeRenderData) {
    let alpha = 1

    if (state.hoveredNodeId !== null && state.focusOnHover) {
      alpha = n.active ? 1 : 0.2
    }

    tweenGroup.add(new Tweened<Graphics>(n.gfx, tweenGroup).to({ alpha }, 200))
  }

  tweenGroup.getAll().forEach((tw) => tw.start())
  state.tweens.set("hover", {
    update: tweenGroup.update.bind(tweenGroup),
    stop() {
      tweenGroup.getAll().forEach((tw) => tw.stop())
    },
  })
}

export function renderPixiFromD3(state: GraphRenderState) {
  renderNodes(state)
  renderLinks(state)
  renderLabels(state)
}
