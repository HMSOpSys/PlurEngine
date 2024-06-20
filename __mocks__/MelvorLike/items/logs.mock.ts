import { itemsToItemDict, slugify, titleCaseify } from "../../utils.mock";
import { Item, BareItem, ItemDict } from "@gameTypes/items";
import { ItemDefaults, applyItemDefaults } from "@gameTypes/typeUtils";

export const logs: BareItem[] = [
  {name: 'Pine Log'},
  {id: 'cedar_log_item'},
  {name: 'Elm Log'},
  {name: 'Oak Log'},
  {name: 'Fir Log'},
  {name: 'Hickory Log'},
  {name: 'Spruce Log'},
  {name: 'Maple Log'},
  {name: 'Birch Log'},
  {name: 'Jungle Log'},
  {name: 'Acacia Log'},
  {name: 'Palm Log'},
  {name: 'Cypress Log'},
]

export const logDefaults: ItemDefaults = {
  defaultId: (item) => slugify(item.name) + '_item',
  defaultName: (item) => titleCaseify(item.id, "_").slice(0, -5),
  defaultCategory: (_item) => 'Log',
  defaultExchange: (item) => [{sellValue: (item.index + 1) * 10}],
}

export const logItems: Item[] = applyItemDefaults(logs, logDefaults)

export const logDict: ItemDict = itemsToItemDict(logItems)