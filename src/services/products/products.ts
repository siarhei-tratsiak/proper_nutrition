import { IProduct } from '@/entities/product/product.types'
import productsEn from '@/data/products_en'
import productsRu from '@/data/products_ru'

export default class ProductsService {
  private products: IProduct[]

  constructor () {
    this.products = this.getProducts('en')
  }

  getProducts (locale: string) {
    const products = locale === 'en' ? productsEn : productsRu

    return products.map(product => ({
      id: +product[0],
      name: `${product[1]}`
    }))
  }

  getProductIds () {
    return this.products.map(product => product.id)
  }
}
