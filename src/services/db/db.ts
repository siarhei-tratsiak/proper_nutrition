import Dexie, { Table } from 'dexie'
import { Constraints, Filters, Rations } from './db.types'
import selected from '@/data/selected'
import ProductsService from '@/services/products/products'

export class DbService extends Dexie {
  constraints!: Table<Constraints>;
  filters!: Table<Filters>;
  rations!: Table<Rations>;

  constructor () {
    super('ProperNutritionDB')
    this.version(1).stores({
      constraints: '++id, nutrientId, min, minMutable, max, maxMutable',
      filters: '++id, productId, selected',
      rations: '++id, date, productId, mass'
    })
  }

  async initSelected () {
    const isNoFilters = !await this.filters.count()

    if (isNoFilters) {
      this.addFilters()
    }
  }

  private addFilters () {
    const productsService = new ProductsService()
    const productIds = productsService.getProductIds()
    const selectedRecords = productIds.map(
      productId => this.getSelectedRecord(productId)
    )

    this.filters.bulkAdd(selectedRecords)
  }

  private getSelectedRecord (productId: number) {
    return {
      productId: productId,
      selected: selected.includes(productId)
    }
  }
}

export const dbService = new DbService()
