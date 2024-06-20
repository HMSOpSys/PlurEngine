import { Item, ItemType } from '../items'
import { applyItemDefaults } from './applyItemDefaults'
import { logItems, logDefaults, logs } from '@mocks/MelvorLike/items/logs.mock'

const logsWithAppliedDefaults: Item[] = [
  {
    id: 'pine_log_item',
    name: 'Pine Log',
    type: ItemType.Generic,
    category: 'Log',
    effect: null,
    exchange: [{sellValue: 10}]
  },
  {
    id: 'cedar_log_item',
    name: 'Cedar Log',
    type: ItemType.Generic,
    category: 'Log',
    effect: null,
    exchange: [{sellValue: 20}]
  },
  {
    id: 'elm_log_item',
    name: 'Elm Log',
    type: ItemType.Generic,
    category: 'Log',
    effect: null,
    exchange: [{sellValue: 30}]
  }
]

describe('applyItemDefaults', () => {
  it('should apply the correct default values', () => {
    logsWithAppliedDefaults.forEach((log, index) => {
      expect(logItems[index]).toEqual(log)
    })
  })

  it('should throw an error if it can not resolve an id', () => {
    const { defaultId, ...defaults } = logDefaults
    const errorMsg = `Item at index 0 must have either a value or default for both the id and the name.`
    expect(() => applyItemDefaults(logs, defaults)).toThrow(errorMsg)
  })

  it('should throw an error if it can not resolve a name', () => {
    const { defaultName, ...defaults } = logDefaults
    const errorMsg = `Item at index 1 must have either a value or default for both the id and the name.`
    expect(() => applyItemDefaults(logs, defaults)).toThrow(errorMsg)
  })
})