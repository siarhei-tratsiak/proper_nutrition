<template>
    <v-data-table
      :headers="headers"
      item-key="id"
      :items="products"
      mobile-breakpoint="0"
      :search="productSearch"
      show-select
      v-model="selected"
    >
      <template v-slot:[`item.name`]="{ item }">
        <router-link :to="{ name: 'Product', params: { id: item.id } }">
          {{ item.name }}
        </router-link>
      </template>
    </v-data-table>
</template>

<script>
import { products } from '@/data/products.js'
import { mapActions, mapState } from 'vuex'

export default {

  computed: {
    ...mapState(['productSearch', 'selectedProductIDs']),

    selected: {
      get: function () {
        return this.selectedProductIDs.map(id => ({ id }))
      },

      set: function (payload) {
        return this.toggleSelected(payload)
      }
    }
  },

  data: () => ({
    headers: [{ text: 'НАЗВАНИЕ', value: 'name' }],
    products: products.map(product => ({ id: product[0], name: product[1] }))
  }),

  methods: {
    ...mapActions(['toggleSelected'])
  }
}
</script>
