<template>
  <v-col cols="12" md="9" sm="6">
    <v-autocomplete
      clearable
      flat
      hide-no-data
      :items="items"
      label="Продукт"
      :rules="[rules.required]"
      :search-input.sync="search"
      v-model="select"
    ></v-autocomplete>
  </v-col>
</template>

<script>
import { products } from '@/data/products'
import { mapMutations, mapState } from 'vuex'
import { debounce } from 'lodash'

export default {
  computed: {
    ...mapState(['editedProduct']),

    select: {
      get: function () {
        return this.editedProduct.product_id
      },

      set: function (productID) {
        const editedProduct = {
          objectName: 'editedProduct',
          state: { product_id: productID }
        }
        this.setStateObject(editedProduct)
      }
    }
  },

  data: function () {
    return {
      debouncedGetAnswer: debounce(this._querySelections, this.debounceTime),
      debounceTime: 500,
      items: [],
      search: ''
    }
  },

  methods: {
    ...mapMutations(['setStateObject']),

    _querySelections: function () {
      const searchResult = this._searchProduct(this.search || '')
      this.items = searchResult.map(product => ({
        text: product[1],
        value: product[0]
      }))
    },

    _searchProduct: function (productName) {
      const escapeProductName = productName
        .replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
      const re = new RegExp(escapeProductName.toLowerCase(), 'g')
      return products.filter(product => re.test(product[1].toLowerCase()))
    }
  },

  props: ['rules'],

  watch: {
    search: function () {
      this.debouncedGetAnswer()
    }
  }
}
</script>
