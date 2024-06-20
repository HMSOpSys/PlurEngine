import { Currency } from "./items"

export type Family = {
  familyName: string,
  familyMembers: FamilyMember[]
  sharedCurrencies: Currency[]
}

export type FamilyMember = {
  name: string
  systemName: string
}