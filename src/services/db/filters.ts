import Db from '@/entities/db/db'
import selected from '@/data/selected'
import ProductsService from '@/services/products/products'
import { IFilter } from '@/entities/db/db.types'

export default class FiltersService extends Db {
  async initSelected () {
    const isNoFilters = !await this.filters.count()

    if (isNoFilters) {
      this.addFilters()
    }
  }

  async toggleSelected () {
    const defaultSelectedRecords = this.getDefaultSelectedRecords()
    const defaultSelectedRecordIds = defaultSelectedRecords
      .map(this.getProductId)

    const selectedRecords = await this.filters
      .where('selected').equals(1)
      .and(record => !defaultSelectedRecordIds.includes(record.productId))
      .toArray()
    const unselectedRecords = await this.filters
      .where('selected').equals(0)
      .and(record => defaultSelectedRecordIds.includes(record.productId))
      .toArray()
    const userChangedRecords = [...selectedRecords, ...unselectedRecords]

    userChangedRecords.forEach(record => this.filters.update(record.id || 0, {
      productId: record.productId,
      selected: !record.selected
    }))
  }

  private getProductId (record: IFilter) {
    return record.productId
  }

  private addFilters () {
    const defaultSelectedRecords = this.getDefaultSelectedRecords()

    this.filters.bulkAdd(defaultSelectedRecords)
  }

  private getDefaultSelectedRecords () {
    const productsService = new ProductsService()
    const productIds = productsService.getProductIds()
    const selectedRecords = productIds.map(
      productId => this.getSelectedRecord(productId)
    )

    return selectedRecords
  }

  private getSelectedRecord (productId: number) {
    return {
      productId: productId,
      selected: +selected.includes(productId)
    }
  }
}
