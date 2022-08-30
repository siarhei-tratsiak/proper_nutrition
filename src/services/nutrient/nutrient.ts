import Nutrient from '@/entities/nutrient/nutrient'
import nutrientsRU from '@/data/nutrients_ru'
import nutrientsEN from '@/data/nutrients_en'
import { LocationQueryValue } from 'vue-router'
import nutrientIndices from '@/data/nutrientIndices'

export default class NutrientService {
  private nutrients: Nutrient[]

  constructor (locale: string) {
    const nutrients = locale === 'ru' ? nutrientsRU : nutrientsEN

    this.nutrients = nutrients.map(nutrient => ({
      id: +nutrient[0],
      name: `${nutrient[1]}`,
      unit: `${nutrient[2]}`
    }))
  }

  getNutrientName (nutrientId: LocationQueryValue | LocationQueryValue[]) {
    const nutrient = nutrientId !== null &&
      this.nutrients.find(nutrient => nutrient.id === +nutrientId)
    const isNoNutrient = nutrientId === null ||
      !nutrientIndices.includes(+nutrientId) ||
      !nutrient

    if (isNoNutrient) {
      return null
    }

    return nutrient.name
  }
}
