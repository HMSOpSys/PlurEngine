import { ItemType, ItemEffect, CurrencyExchange, Item, BareItem } from "../items"

export interface BareItemWithIndex extends BareItem {
  index: number;
}

export type ItemDefaults = {
  defaultId?: (item: BareItemWithIndex) => string
  defaultName?: (item: BareItemWithIndex) => string
  defaultType?: (item: BareItemWithIndex) => ItemType
  defaultCategory?: (item: BareItemWithIndex) => string
  defaultEffect?: (item: BareItemWithIndex) => ItemEffect[]
  defaultExchange?: (item: BareItemWithIndex) => CurrencyExchange[]
}

const resolveDefault = <T, U extends (item: BareItemWithIndex) => T>(item: BareItemWithIndex, itemValue: T | undefined, defaultFunction: U | undefined, defaultValue: T | undefined): T => {
  if (itemValue !== undefined) {
    return itemValue
  } else if (defaultFunction) {
    return defaultFunction(item)
  } else if (defaultValue !== undefined) {
    return defaultValue
  } else {
    throw new Error(`Item at index ${item.index} must have either a value or default for both the id and the name.`)
  }
}

export const applyItemDefaults = (items: BareItem[], defaults: ItemDefaults): Item[] => {
  return items.map((bareItem, index) => {
    const item: BareItemWithIndex = { 
      ...bareItem,
      index: index
    }
    item.id = resolveDefault(item, item.id, defaults.defaultId, undefined)
    item.name = resolveDefault(item, item.name, defaults.defaultName, undefined)
    item.type = resolveDefault(item, item.type, defaults.defaultType, ItemType.Generic)
    item.category = resolveDefault(item, item.category, defaults.defaultCategory, null)
    item.effect = resolveDefault(item, item.effect, defaults.defaultEffect, null)
    item.exchange = resolveDefault(item, item.exchange, defaults.defaultExchange, null)

    delete item['index']
    const resolvedItem: Item = { ...item } as Item
    return resolvedItem
  })
}
