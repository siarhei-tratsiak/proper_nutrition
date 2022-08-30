import { INutrient } from './nutrient.types'

export default class Nutrient implements INutrient {
  id: number
  name: string
  unit: string

  constructor (id: number, name: string, unit: string) {
    this.id = id
    this.name = name
    this.unit = unit
  }
}
