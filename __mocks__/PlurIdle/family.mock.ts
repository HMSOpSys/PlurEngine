import type { Family, FamilyMember } from '@gameTypes/family';

import { householdCash } from './currencies.mock';

const tim: FamilyMember = {
  name: 'Tim',
  systemName: 'Systim',
}

const ben: FamilyMember = {
  name: 'Ben',
  systemName: 'The Council',
}

export const family: Family = {
  familyName: 'Johnson',
  familyMembers: [
    tim,
    ben,
  ],
  sharedCurrencies: [
    householdCash,
  ],
}