import { BareCraftAction, Skill, SkillType } from "@/gameTypes/skills";
import { ingotDict } from "../items/ingots.mock";
import { oreDict } from "../items/ores.mock";
import { ActionDefaults, BareActionWithIndex, applyCraftActionDefaults } from "@/gameTypes/typeUtils";
import { slugify, titleCaseify } from "@mocks/utils.mock";
import { Items } from "@/gameTypes/items";

export const smithing: Skill = {
  id: 'smithing',
  name: 'Smithing',
  description: 'Smith items',
  type: SkillType.Craft,
}

export const smelt: BareCraftAction[] = [
  {
    name: 'Bronze Ingot',
    crafts: [{
      requiredItems: [
        {item: oreDict.copper_ore, count: 1},
        {item: oreDict.tin_ore, count: 1},
    ]}]
  },
  {id: 'smelt_iron_ingot'},
  {name: 'Silver Ingot'},
  {
    name: 'Steel Ingot',
    crafts: [{
      requiredItems: [
        {item: oreDict.iron_ore, count: 1},
        {item: oreDict.coal_ore, count: 1},
    ]}]
  },
  {name: 'Gold Ingot'},
  {name: 'Mithril Ingot'},
  {name: 'Platinum Ingot'},
  {name: 'Adamantite Ingot'},
  {name: 'Unobtainium Ingot'},
]

const defaultIngotReqItems = (action: BareActionWithIndex): Items[] => {
  const highEndIngots = ['mithril', 'adamantite', 'unobtainium']
  const actionIngot = action.id.split('_')[1]
  if (highEndIngots.includes(actionIngot)) {
    return [
      {item: oreDict[actionIngot + '_ore'], count: 1},
      {item: oreDict.coal_ore, count: highEndIngots.indexOf(actionIngot) + 1}
    ]
  }
  return [{item: oreDict[actionIngot + '_ore'], count: 1}]
}

export const smithingDefaults: ActionDefaults = {
  defaultId: (action) => 'smelt_' + slugify(action.name),
  defaultName: (item) => titleCaseify(item.id, '_').slice(6),
  defaultTime: (action) => (action.aIndex + 1) * .5,
  defaultExp: (action) => (action.aIndex + 1) * 5,
  defaultRequiredLevel: (action) => action.aIndex * 2,
  defaultProduces: (action) => ingotDict[action.id.split('_')[1] + '_ingot'],
  defaultRequiredItems: defaultIngotReqItems,
}

export const smithingActions = applyCraftActionDefaults(smelt, smithingDefaults)