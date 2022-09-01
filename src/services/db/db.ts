import Dexie, { Table } from 'dexie'
import { IConstraint, IFilter, IRation } from './db.types'
import { initSelected, toggleSelected } from './filters'

export class DbService extends Dexie {
  constraints!: Table<IConstraint>;
  filters!: Table<IFilter>;
  rations!: Table<IRation>;

  constructor () {
    super('ProperNutritionDB')
    this.version(1).stores({
      constraints: '++id, nutrientId, min, minMutable, max, maxMutable',
      filters: '++id, productId, selected',
      rations: '++id, date, productId, mass'
    })
  }

  initSelected = initSelected
  toggleSelected = toggleSelected
}

export const dbService = new DbService()
