<template>
    <v-data-table
      :footer-props="{
        'items-per-page-all-text': $t('table.all'),
        'items-per-page-text': $t('table.rowsPerPage'),
        'page-text': $t('table.pageText')
      }"
      :headers="headers"
      item-key="id"
      :items="products"
      mobile-breakpoint="0"
      :no-data-text="$t('table.noDataText')"
      :no-results-text="$t('table.noResultsText')"
      :search="productSearch"
      show-select
      :sort-by="sortBy"
      sort-desc
      v-model="selected"
    >
      <template #[`item.name`]="{ item }">
        <router-link :to="{ name: 'Product', params: { id: item.id } }">
          {{ item.name }}
        </router-link>
      </template>
    </v-data-table>
</template>

<script>
import { IDBS } from '@/api/indexedDBService'
import { mapActions, mapState } from 'vuex'
import { nutrientIndices } from '@/data/nutrientIndices'
import { foodNutrients } from '@/data/foodNutrients'

export default {
  computed: {
    ...mapState(['productSearch', 'selectedProductIDs']),

    headers: function () {
      return [{ text: this.$t('products.tableHeader'), value: 'name' }]
    },

    products: function () {
      const products = IDBS.getProducts(this.$i18n.locale)
      const nutrientID = +this.$route.query.nutrient_id
      const isNutrientID = nutrientIndices.includes(nutrientID)
      if (isNutrientID) {
        return this.getProductsByNutrient(nutrientID, products)
      }
      return products.map(product => ({
        id: product[0],
        name: product[1]
      }))
    },

    selected: {
      get: function () {
        return this.selectedProductIDs.map(id => ({ id }))
      },

      set: function (payload) {
        return this.toggleSelected(payload)
      }
    },

    sortBy: function () {
      if (this.$route.query.nutrient_id) {
        return 'nutrientValue'
      }
      return ''
    }
  },

  methods: {
    ...mapActions(['toggleSelected']),

    getProductsByNutrient: function (nutrientID, products) {
      const nutrientIndex = nutrientIndices.findIndex(id => id === nutrientID)
      return products.map(product => ({
        id: product[0],
        name: product[1],
        nutrientValue: foodNutrients
          .find(food => food[0] === product[0])[1][nutrientIndex]
      }))
    }
  }
}
</script>
