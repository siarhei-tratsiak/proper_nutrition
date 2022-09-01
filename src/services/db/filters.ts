import { DbService } from './db'
import selected from '@/data/selected'
import ProductsService from '@/services/products/products'
import { IFilter } from './db.types'

export async function initSelected (this: DbService) {
  const isNoFilters = !await this.filters.count()

  if (isNoFilters) {
    addFilters.call(this)
  }
}

export async function toggleSelected (this: DbService) {
  const defaultSelectedRecords = getDefaultSelectedRecords()
  const defaultSelectedRecordIds = defaultSelectedRecords.map(getProductId)

  const selectedRecords = await this.filters
    .where('selected').equals(1)
    // .and(record => !defaultSelectedRecordIds.includes(record.productId))
    .toArray()
  const unselectedRecords = await this.filters
    .where({ selected: false })
    .and(record => defaultSelectedRecordIds.includes(record.productId))
    .toArray()
  const userChangedRecords = [...selectedRecords, ...unselectedRecords]

  userChangedRecords.forEach(record => this.filters.update(record.id || 0, {
    productId: record.productId,
    selected: !record.selected
  }))
}

function getProductId (record: IFilter) {
  return record.productId
}

function addFilters (this: DbService) {
  const defaultSelectedRecords = getDefaultSelectedRecords()

  this.filters.bulkAdd(defaultSelectedRecords)
}

function getDefaultSelectedRecords () {
  const productsService = new ProductsService()
  const productIds = productsService.getProductIds()
  const selectedRecords = productIds.map(
    productId => getSelectedRecord(productId)
  )

  return selectedRecords
}

function getSelectedRecord (productId: number) {
  return {
    productId: productId,
    selected: selected.includes(productId)
  }
}
