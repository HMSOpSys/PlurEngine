import { BareItem, Item, ItemDict } from "@gameTypes/items";
import { ItemDefaults, applyItemDefaults } from "@gameTypes/typeUtils";
import { itemsToItemDict, titleCaseify } from "../../utils.mock";

const ores: BareItem[] = [
  {id: 'copper_ore'},
  {id: 'tin_ore'},
  {id: 'iron_ore'},
  {id: 'silver_ore'},
  {id: 'coal_ore'},
  {id: 'gold_ore'},
  {id: 'mithril_ore'},
  {id: 'platinum_ore'},
  {id: 'adamantite_ore'},
  {id: 'unobtainium_ore'},
]

const oreDefaults: ItemDefaults = {
  defaultName: (item) => titleCaseify(item.id, '_'),
  defaultCategory: (item) => titleCaseify(item.id.split('_')[1]),
  defaultExchange: (item) => [{sellValue: item.index > ores.length/2 ? 
    (item.index + 1) * 10 : (item.index + 1) * 100}],
}

export const oreItems: Item[] = applyItemDefaults(ores, oreDefaults)
export const oreDict: ItemDict = itemsToItemDict(oreItems)