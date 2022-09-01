import Dexie, { Table } from 'dexie'
import { IConstraint, IRation, IFilter } from './db.types'

export default class Db extends Dexie {
  protected constraints!: Table<IConstraint>;
  protected filters!: Table<IFilter>;
  protected rations!: Table<IRation>;

  constructor () {
    super('ProperNutritionDB')
    this.version(1).stores({
      constraints: '++id, nutrientId, min, minMutable, max, maxMutable',
      filters: '++id, productId, selected',
      rations: '++id, date, productId, mass'
    })
  }
}
