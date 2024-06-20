import { ActionDefaults, applyGatherActionDefaults } from "@gameTypes/typeUtils";
import { BareGatherAction, Skill, SkillType } from "@gameTypes/skills";
import { slugify, itemToItemDrop } from "@mocks/utils.mock";
import { oreItems } from "../items/ores.mock";

export const mining: Skill = {
  id: 'mining',
  name: 'Mining',
  description: 'Mine ore',
  type: SkillType.Gather,
}

const veins: BareGatherAction[] = [
  {name: 'Copper Vein'},
  {name: 'Tin Vein'},
  {name: 'Iron Vein'},
  {name: 'Silver Vein'},
  {name: 'Coal Vein'},
  {name: 'Gold Vein'},
  {name: 'Mithril Vein'},
  {name: 'Platinum Vein'},
  {name: 'Adamantite Vein'},
  {name: 'Unobtainium Vein'},
]

const miningDefaults: ActionDefaults = {
  defaultId: (action) => slugify(action.name) + action.aIndex,
  defaultTime: (action) => (action.aIndex + 1) * .5,
  defaultExp: (action) => (action.aIndex + 1) * 5,
  defaultRequiredLevel: (action) => action.aIndex * 2,
  defaultProduces: (action) => itemToItemDrop(oreItems[action.aIndex]),
}

export const miningActions = applyGatherActionDefaults(veins, miningDefaults)