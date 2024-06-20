import { AnyImage } from "./general"
import { ItemDrop } from "./itemTable"
import { Items } from "./items"

export enum SkillType {
  Combat = "Combat",
  Gather = "Gather",
  Craft = "Craft",
  Passive = "Passive",
}

type BareAction = {
  id?: string
  name?: string
  description?: string
  icon?: AnyImage
}

export interface BareGatherAction extends BareAction {
  time?: number
  exp?: number
  requiredLevel?: number
  produces?: ItemDrop
}

export interface BareCraftAction extends BareAction {
  crafts?: BareCraft[]
}

export interface BareCraft {
  time?: number
  exp?: number
  icon?: AnyImage
  requiredLevel?: number
  requiredItems?: Items[]
  produces?: ItemDrop
}

export type Craft = Required<Omit<BareCraft, 'icon'>> & {
  icon?: AnyImage
}

export type GatherAction = Required<Omit<BareGatherAction, 'description' | 'icon'>> & {
  description?: string
  icon?: AnyImage
}

export type CraftAction = Required<Omit<BareCraftAction, 'description' | 'icon' | 'crafts'>> & {
  description?: string
  icon?: AnyImage
  crafts: Craft[]
}

export type Skill = {
  id: string
  name: string
  description: string
  type: SkillType
}