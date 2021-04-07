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

export default {
  computed: {
    ...mapState(['productSearch', 'selectedProductIDs']),

    headers: function () {
      return [{ text: this.$t('products.tableHeader'), value: 'name' }]
    },

    products: function () {
      const products = IDBS.getProducts(this.$i18n.locale)
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
    }
  },

  methods: {
    ...mapActions(['toggleSelected'])
  }
}
</script>
