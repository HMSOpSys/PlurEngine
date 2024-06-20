import { Item, Items } from "./items"

export type SingleItemDrop =
  | Items
  | null

export interface ItemDropWithConstraints {
  type?: string
  source?: string
  items?: SingleItemDrop[]
}

export interface ItemDropWithCurve {
  curve: string
  items: SingleItemDrop[]
}

export interface ItemDropWithMultipleItems {
  items: SingleItemDrop[]
}

export interface ItemDropWithWeights {
  weight: number
  items: SingleItemDrop[]
}

export interface ItemDropWithChance {
  chance: number
  items: SingleItemDrop[]
}

export type ItemDrop =
  | SingleItemDrop
  | ItemDropWithConstraints
  | ItemDropWithCurve
  | ItemDropWithMultipleItems
  | ItemDropWithWeights
  | ItemDropWithChance