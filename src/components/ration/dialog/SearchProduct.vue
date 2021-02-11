<template>
  <v-col cols="12" sm="6" md="9">
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
import { products } from '@/data/products.js'
import { mapMutations, mapState } from 'vuex'
import debounce from 'lodash/debounce'

export default {
  computed: {
    ...mapState(['editedProduct']),

    select: {
      get: function () {
        return this.editedProduct.product_id
      },

      set: function (productID) {
        this.setEditedProduct({ product_id: productID })
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
    ...mapMutations(['setEditedProduct']),

    _querySelections () {
      const searchResult = this._searchProduct(this.search || '')
      this.items = searchResult.map(product => ({
        text: product[1],
        value: product[0]
      }))
    },

    _searchProduct (productName) {
      const re = new RegExp(productName.toLowerCase(), 'g')
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
