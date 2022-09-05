<template>
  <v-table>
    <thead>
      <tr>
        <th class="text-left"></th>

        <th class="text-left">
          {{ $t('products.tableHeader') }}
        </th>
      </tr>
    </thead>

    <tbody>
      <tr
        v-for="product in products"
        :key="product.id"
      >
        <td></td>

        <td>{{ product.name }}</td>
      </tr>
    </tbody>
  </v-table>
</template>

<script lang="ts" setup>
import nutrientIndices from '@/data/nutrientIndices'
import
productCompositions,
{ IProductComposition }
  from '@/data/productСompositions'
import { useI18n } from 'vue-i18n'
import { computed } from 'vue'
import ProductsService from '@/services/products/products'
import { useRoute } from 'vue-router'
import { IProduct } from '@/entities/product/product.types'

const { locale } = useI18n()
const productsService = new ProductsService()
const route = useRoute()

const products = computed(() => {
  const products = productsService.getProducts(locale.value)
  const nutrientId = route.query.nutrient_id

  const isNutrientID = nutrientId !== null &&
    nutrientIndices.includes(+nutrientId)

  if (isNutrientID) {
    return getProductsByNutrient(+nutrientId, products)
  }

  return products

  function getProductsByNutrient (nutrientId: number, products: IProduct[]) {
    const nutrientIndex = nutrientIndices.findIndex(id => id === nutrientId)

    return products.map(product => ({
      id: product.id,
      name: product.name,
      nutrientValue: getNutrientValue(product, nutrientIndex)
    }))

    function getNutrientValue (product: IProduct, nutrientIndex: number) {
      const productComposition = productCompositions
        .find(food => food[0] === product.id)

      const emptyArray: IProductComposition = [
        0,
        Array(nutrientIndex).fill(null)
      ]

      const nutrients = (productComposition || emptyArray)[1]

      return nutrients[nutrientIndex]
    }
  }
})
</script>
