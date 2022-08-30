import { IProduct } from '@/entities/product/product.types'
import products from '@/data/products_en'

export default class ProductsService {
  private products: IProduct[]

  constructor () {
    this.products = products.map(product => ({
      id: +product[0],
      name: `${product[1]}`
    }))
  }

  getProductIds () {
    return this.products.map(product => product.id)
  }
}
