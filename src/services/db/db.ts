import Dexie, { Table } from 'dexie'
import { Constraints, Filters, Rations } from './db.types'

export class DbService extends Dexie {
  constraints!: Table<Constraints>;
  filters!: Table<Filters>;
  rations!: Table<Rations>;

  constructor () {
    super('ProperNutritionDB')
    this.version(1).stores({
      constraints: '++id, nutrientId, min, minMutable, max, maxMutable',
      filters: '++id, productId, selected, favored',
      rations: '++id, date, productId, mass'
    })
  }
}

export const db = new DbService()
