import { ingotDict } from "@mocks/MelvorLike/items/ingots.mock";
import { CraftAction, GatherAction } from "../skills";
import { oreDict } from "@mocks/MelvorLike/items/ores.mock";
import { logDict } from "@mocks/MelvorLike/items/logs.mock";
import { trees, woodCuttingActions, woodCuttingDefaults } from "@mocks/MelvorLike/skills/gatherWood.mock";
import { smelt, smithingActions, smithingDefaults } from "@mocks/MelvorLike/skills/smithing.mock";
import { applyCraftActionDefaults, applyGatherActionDefaults } from "./applyActionDefaults";

const woodCuttingWithAppliedDefaults: GatherAction[] = [
  {
    id: "cut_pine_tree",
    name: "Pine Tree",
    time: .5,
    exp: 5,
    requiredLevel: 0,
    produces: {item: logDict.pine_log_item, count: 1}
  },
  {
    id: "cut_cedar_tree",
    name: "Cedar Tree",
    time: 1,
    exp: 10,
    requiredLevel: 2,
    produces: {item: logDict.cedar_log_item, count: 1}
  },
  {
    id: "cut_elm_tree",
    name: "Elm Tree",
    time: 1.5,
    exp: 15,
    requiredLevel: 4,
    produces: {item: logDict.elm_log_item, count: 1}
  }
]

describe('applyGatherActionDefaults', () => {
  it('should apply default values', () => {
    woodCuttingWithAppliedDefaults.forEach((action, index) => {
      expect(woodCuttingActions[index]).toEqual(action)
    })
  })

  it('should throw an error if no value or default for id is provided', () => {
    const { defaultId, ...defaults } = woodCuttingDefaults
    const errorMsg = 'Action at index 0 must have either a value or default for both the id and the name.'
    expect(() => applyGatherActionDefaults(trees, defaults)).toThrow(errorMsg)
  })

  it('should throw an error if no value or default for name is provided', () => {
    const { defaultName, ...defaults } = woodCuttingDefaults
    const errorMsg = 'Action at index 1 must have either a value or default for both the id and the name.'
    expect(() => applyGatherActionDefaults(trees, defaults)).toThrow(errorMsg)
  })
})

const smithingWithAppliedDefaults: CraftAction[] = [
  {
    id: "smelt_bronze_ingot",
    name: "Bronze Ingot",
    crafts: [{
      time: .5,
      exp: 5,
      requiredLevel: 0,
      requiredItems: [
        {item: oreDict.copper_ore, count: 1}, 
        {item: oreDict.tin_ore, count: 1}
      ],
      produces: ingotDict.bronze_ingot
    }]
  },
  {
    id: "smelt_iron_ingot",
    name: "Iron Ingot",
    crafts: [{
      time: 1,
      exp: 10,
      requiredLevel: 2,
      requiredItems: [{item: oreDict.iron_ore, count: 1}],
      produces: ingotDict.iron_ingot
    }]
  },
  {
    id: "smelt_silver_ingot",
    name: "Silver Ingot",
    crafts: [{
      time: 1.5,
      exp: 15,
      requiredLevel: 4,
      requiredItems: [{item: oreDict.silver_ore, count: 1}],
      produces: ingotDict.silver_ingot
    }]
  }
]

describe('applyCraftActionDefaults', () => {
  it('should apply default values to craft actions', () => {
    smithingWithAppliedDefaults.forEach((ingot, index) => {
      expect(smithingActions[index]).toEqual(ingot)
    })
  })

  it('should throw an error if no value or default for id is provided', () => {
    const { defaultId, ...defaults } = smithingDefaults
    const errorMsg = 'Action at index 0 must have either a value or default for both the id and the name.'
    expect(() => applyCraftActionDefaults(smelt, defaults)).toThrow(errorMsg)
  })

  it('should throw an error if no value or default for name is provided', () => {
    const { defaultName, ...defaults } = smithingDefaults
    const errorMsg = 'Action at index 1 must have either a value or default for both the id and the name.'
    expect(() => applyCraftActionDefaults(smelt, defaults)).toThrow(errorMsg)
  })

  it('should throw an error if no value or default for a Craft property is provided', () => {
    const { defaultTime, ...defaults } = smithingDefaults
    const errorMsg = 'Action at index 0 with Craft at index 0 must have either a value or default for all properties in the Craft.'
    expect(() => applyCraftActionDefaults(smelt, defaults)).toThrow(errorMsg)
  })
})