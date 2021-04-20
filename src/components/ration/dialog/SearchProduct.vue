<template>
  <v-col cols="12" md="9" sm="6">
    <v-autocomplete
      clearable
      flat
      hide-no-data
      :items="items"
      :label="label"
      :menu-props="{ offsetOverflow: false }"
      :rules="[rules.required]"
      :search-input.sync="search"
      v-model="select"
    >
      <template #item="{ item }">
        <!-- for correct style display -->
        <v-list-item-content>
          <v-list-item-title v-html="item.text"></v-list-item-title>
        </v-list-item-content>
      </template>
    </v-autocomplete>
  </v-col>
</template>

<script>
import { IDBS } from '@/api/indexedDBService'
import { mapMutations, mapState } from 'vuex'
import { debounce } from 'lodash'

export default {
  computed: {
    ...mapState(['editedProduct', 'status']),

    isOpened: function () {
      return this.status.productDialogIsOpened
    },

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

  created: function () {
    this._setProductID()
  },

  data: function () {
    return {
      debouncedGetAnswer: debounce(this._querySelections, this.debounceTime),
      debounceTime: 500,
      items: [],
      label: this.$t('dialog.searchProductLabel'),
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
      const products = IDBS.getProducts(this.$i18n.locale)
      return products.filter(product => re.test(product[1].toLowerCase()))
    },

    _setProductID: function () {
      const productID = +this.$route.params.id
      this.select = productID
    }
  },

  props: ['rules'],

  watch: {
    search: function () {
      this.debouncedGetAnswer()
    },

    isOpened: function () {
      if (this.isOpened) {
        this._setProductID()
      }
    }
  }
}
</script>

<style scoped>
  .v-list-item__title {
    white-space: normal !important;
  }
</style>
