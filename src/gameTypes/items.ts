import { AnyImage } from "./general"

export type Currency = {
  name: string
}

export enum ItemType {
  Generic = "Generic",
  Consumable = "Consumable",
  Usable = "Usable",
  Equipment = "Equipment",
}

export type ItemEffect = {
  id: string
  name: string
  value: number
}

export type CurrencyExchange = {
  buyCurrency?: Currency
  buyValue?: number
  sellCurrency?: Currency
  sellValue?: number
} & (
  | {
      buyCurrency?: Currency
      buyValue: number
    }
  | {
      sellCurrency?: Currency
      sellValue: number
    }
  | {
      buyCurrency?: Currency
      buyValue: number
      sellCurrency?: Currency
      sellValue: number
    }
)

export interface BareItem {
  id?: string
  name?: string
  type?: ItemType
  category?: string | null
  description?: string
  icon?: AnyImage
  effect?: ItemEffect[] | null
  exchange?: CurrencyExchange[] | null
}

export type Item = Required<Omit<BareItem, 'description' | 'icon'>> & {
  description?: string;
  icon?: AnyImage;
}

export type ItemDict = Record<string, Item>

export type Items = {
  item: Item | Currency
  count: number
}