import { ItemDrop } from "@gameTypes/itemTable"
import { Item, ItemDict } from "@gameTypes/items"

export const slugify = (str: string) => {
  return str
    .toLowerCase()
    .trim()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '') // Strip accents
    .replace(/[^0-9a-z\s]/gi, '') // Remove anything that is not a letter, number, or space
    .replace(/\s+/g, "_") // Replace spaces with an underscore
}

export const titleCaseify = (str: string, splitSeparator: string = " ", joinSeparator: string = " ") => {
  return str
    .toLowerCase()
    .split(splitSeparator)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(joinSeparator)
}

export const itemToItemDrop = (item: Item, count: number = 1): ItemDrop => {
  return {
    item: item,
    count: count
  }
}

export const itemsToItemDict = (items: Item[]): ItemDict => {
  const itemIds = items.map((item) => item.id)
  const itemDict: ItemDict = {}
  itemIds.forEach((id, index) => {
    itemDict[id] = items[index]
  })
  return itemDict
}