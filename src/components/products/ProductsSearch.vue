<template>
  <v-text-field
    :append-icon="mdiMagnify"
    dense
    hide-details
    :label="$t('products.searchLabel')"
    single-line
    v-model="search"
  >
  </v-text-field>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
import { mdiMagnify } from '@mdi/js'

export default {
  computed: {
    ...mapState(['productSearch']),

    search: {
      get: function () {
        return this.productSearch
      },

      set: function (searchText) {
        this._debounceSearch(searchText)
      }
    }
  },

  data: () => ({
    delayMS: 500,
    inputTime: 0,
    mdiMagnify
  }),

  methods: {
    ...mapMutations(['setState']),

    _debounceSearch: function (searchText) {
      this.inputTime = Date.now()
      setTimeout(this._checkDelay, this.delayMS, searchText)
    },

    _checkDelay: function (searchText) {
      const isDelayEnough = Date.now() - this.inputTime >= this.delayMS
      if (isDelayEnough) {
        this._setSearch(searchText)
      }
    },

    _setSearch: function (searchText) {
      const searchPayload = { name: 'productSearch', value: searchText }
      this.setState(searchPayload)
    }
  }
}
</script>

<style>

</style>
