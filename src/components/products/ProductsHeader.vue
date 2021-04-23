<template>
    <v-card-title>
      {{ header }}

      <v-spacer></v-spacer>

      <DefaultButton />

      <v-spacer></v-spacer>

      <ProductsSearch />
    </v-card-title>
</template>

<script>
import DefaultButton from '@/components/products/DefaultButton'
import ProductsSearch from '@/components/products/ProductsSearch'
import { nutrients as nutrientsRU } from '@/data/nutrients_ru'
import { nutrients as nutrientsEN } from '@/data/nutrients_en'
import { nutrientIndices } from '@/data/nutrientIndices'

export default {
  components: {
    DefaultButton,
    ProductsSearch
  },

  computed: {
    header: function () {
      const nutrientID = +this.$route.query.nutrient_id
      const isNutrientID = nutrientIndices.includes(nutrientID)
      if (isNutrientID) {
        return this.headerWithSorted(nutrientID)
      }
      return this.$t('products.header')
    }
  },

  methods: {
    headerWithSorted: function (nutrientID) {
      const nutrients = this.$i18n.locale === 'ru'
        ? nutrientsRU
        : nutrientsEN
      const nutrientName = nutrients
        .find(nutrient => nutrient[0] === nutrientID)[1]
      return this.$t('products.header') +
          this.$t('products.sorted', { nutrientName })
    }
  }
}
</script>
