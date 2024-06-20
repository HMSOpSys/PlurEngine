import { ActionDefaults, applyGatherActionDefaults } from '@gameTypes/typeUtils';
import { BareGatherAction, GatherAction, SkillType, type Skill } from '@gameTypes/skills';
import { itemToItemDrop, slugify, titleCaseify } from '@mocks/utils.mock';
import { logItems } from '../items/logs.mock';

export const woodCutting: Skill = {
  id: 'woodcutting',
  name: 'Woodcutting',
  description: 'Cut down trees',
  type: SkillType.Gather,
}

export const trees: BareGatherAction[] = [
  {name: 'Pine Tree'},
  {id: 'cut_cedar_tree'},
  {name: 'Elm Tree'},
  {name: 'Oak Tree'},
  {name: 'Fir Tree'},
  {name: 'Hickory Tree'},
  {name: 'Spruce Tree'},
  {name: 'Maple Tree'},
  {name: 'Birch Tree'},
  {name: 'Jungle Tree'},
  {name: 'Acacia Tree'},
  {name: 'Palm Tree'},
  {name: 'Cypress Tree'},
]

export const woodCuttingDefaults: ActionDefaults = {
  defaultId: (action) => "cut_" + slugify(action.name),
  defaultName: (item) => titleCaseify(item.id, '_').slice(4),
  defaultTime: (action) => (action.aIndex + 1) * .5,
  defaultExp: (action) => (action.aIndex + 1) * 5,
  defaultRequiredLevel: (action) => action.aIndex * 2,
  defaultProduces: (action) => itemToItemDrop(logItems[action.aIndex]),
}

export const woodCuttingActions: GatherAction[] = applyGatherActionDefaults(trees, woodCuttingDefaults)
