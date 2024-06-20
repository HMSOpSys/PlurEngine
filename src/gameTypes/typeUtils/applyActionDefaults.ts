import { ItemDrop } from "../itemTable"
import { Items } from "../items"
import { BareGatherAction, BareCraftAction, GatherAction, BareCraft, Craft, CraftAction } from "../skills"

interface BareGatherActionWithIndex extends BareGatherAction {
  aIndex: number
}

interface BareCraftActionWithIndex extends BareCraftAction {
  aIndex: number
}

export interface BareCraftWithIndex extends BareCraft {
  id: string
  name: string
  aIndex: number
  cIndex: number
}

export type BareActionWithIndex = 
  | BareGatherActionWithIndex 
  | BareCraftActionWithIndex

export type ActionDefaults = {
  defaultId?: (action: BareActionWithIndex) => string
  defaultName?: (action: BareActionWithIndex) => string
  defaultTime?: (action: BareActionWithIndex) => number
  defaultExp?: (action: BareActionWithIndex) => number
  defaultRequiredLevel?: (action: BareActionWithIndex) => number
  defaultProduces?: (action: BareActionWithIndex) => ItemDrop
  defaultRequiredItems?: (action: BareActionWithIndex) => Items[]
}

const resolveDefault = <T, U extends (action: BareActionWithIndex) => T>(action: BareActionWithIndex, actionValue: T | undefined, defaultFunction: U | undefined, defaultValue: T | undefined): T => {
  if (actionValue !== undefined) {
    return actionValue
  } else if (defaultFunction) {
    return defaultFunction(action)
  } else if (defaultValue !== undefined) {
    return defaultValue
  } else {
    const errorStart = `Action at index ${action.aIndex}`
    const errorMid = "must have either a value or default for"
    const errorIdName = "both the id and the name."
    const errorAllProperties = "all properties in the Craft."
    if (!('cIndex' in action)) {
      throw new Error(`${errorStart} ${errorMid} ${errorIdName}`)
    }
    throw new Error(`${errorStart} with Craft at index ${action.cIndex} ${errorMid} ${errorAllProperties}`)
  }
}

export const applyGatherActionDefaults = (actions: BareGatherAction[], defaults: ActionDefaults): GatherAction[] => {
  return actions.map((bareAction, actionIndex) => {
    const action: BareGatherActionWithIndex = {
      ...bareAction,
      aIndex: actionIndex
    }
    action.id = resolveDefault(action, action.id, defaults.defaultId, undefined)
    action.name = resolveDefault(action, action.name, defaults.defaultName, undefined)
    action.time = resolveDefault(action, action.time, defaults.defaultTime, undefined)
    action.exp = resolveDefault(action, action.exp, defaults.defaultExp, undefined)
    action.requiredLevel = resolveDefault(action, action.requiredLevel, defaults.defaultRequiredLevel, undefined)
    action.produces = resolveDefault(action, action.produces, defaults.defaultProduces, undefined)
    
    delete action['aIndex']
    const resolvedAction: GatherAction = { ...action } as GatherAction
    return resolvedAction
  })
}

const applyCraftDefaults = (crafts: BareCraft[] = [{}], defaults: ActionDefaults, action: BareCraftActionWithIndex): Craft[] => {
  return crafts.map((bareCraft, craftIndex) => {
    const craft: BareCraftWithIndex = {
      ...bareCraft,
      id: action.id,
      name: action.name,
      aIndex: action.aIndex,
      cIndex: craftIndex
    }
    craft.time = resolveDefault(craft, craft.time, defaults.defaultTime, undefined)
    craft.exp = resolveDefault(craft, craft.exp, defaults.defaultExp, undefined)
    craft.requiredLevel = resolveDefault(craft, craft.requiredLevel, defaults.defaultRequiredLevel, undefined)
    craft.requiredItems = resolveDefault(craft, craft.requiredItems, defaults.defaultRequiredItems, undefined)
    craft.produces = resolveDefault(craft, craft.produces, defaults.defaultProduces, undefined)

    const { id, name, aIndex, cIndex, ...rest } = craft
    const resolvedCraft: Craft = { ...rest } as Craft
    return resolvedCraft
  })
}

export const applyCraftActionDefaults = (actions: BareCraftAction[], defaults: ActionDefaults): CraftAction[] => {
  return actions.map((bareAction, actionIndex) => {
    const action: BareCraftActionWithIndex = {
      ...bareAction,
      aIndex: actionIndex
    }
    action.id = resolveDefault(action, action.id, defaults.defaultId, undefined)
    action.name = resolveDefault(action, action.name, defaults.defaultName, undefined)
    action.crafts = applyCraftDefaults(action.crafts, defaults, action)
    
    delete action['aIndex']
    const resolvedAction: CraftAction = { ...action } as CraftAction
    return resolvedAction
  })
}