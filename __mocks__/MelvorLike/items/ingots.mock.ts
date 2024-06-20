import { BareItem, Item, ItemDict } from "@gameTypes/items"
import { ItemDefaults, applyItemDefaults } from "@gameTypes/typeUtils"
import { titleCaseify, itemsToItemDict } from "@mocks/utils.mock"

const ingots: BareItem[] = [
  {id: 'bronze_ingot'},
  {id: 'iron_ingot'},
  {id: 'silver_ingot'},
  {id: 'steel_ingot'},
  {id: 'gold_ingot'},
  {id: 'mithril_ingot'},
  {id: 'platinum_ingot'},
  {id: 'adamantite_ingot'},
  {id: 'unobtainium_ingot'},
]

const preciousMetals = ['silver_ingot', 'gold_ingot', 'platinum_ingot']
const ingotDefaults: ItemDefaults = {
  defaultName: (item) => titleCaseify(item.id, '_'),
  defaultCategory: (_item) => preciousMetals.includes(_item.id) ? 'Precious Ingot' : 'Base Ingot',
  defaultExchange: (item) => [{sellValue: (item.index + 1) * 10}],
}

export const ingotItems: Item[] = applyItemDefaults(ingots, ingotDefaults)
export const ingotDict: ItemDict = itemsToItemDict(ingotItems)
export const preciousIngotsDict: ItemDict = itemsToItemDict(ingotItems.filter((item) => item.category === 'Precious Ingot'))
export const baseIngotsDict: ItemDict = itemsToItemDict(ingotItems.filter((item) => item.category === 'Base Ingot'))