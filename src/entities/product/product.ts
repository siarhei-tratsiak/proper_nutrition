import { IProduct } from './product.types'

export default class Product implements IProduct {
  id: number;
  name: string;

  constructor (id: number, name: string) {
    this.id = id
    this.name = name
  }
}
