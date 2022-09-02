<template>
  <v-text-field
    append-icon="mdi-magnify"
    density="comfortable"
    :label="$t('products.searchLabel')"
    v-model="search"
  />
</template>

<script lang="ts" setup>
import { useProductSearchStore } from '@/store/products/search'
import { computed } from 'vue'

const delayMS = 500
let inputTime = 0

const productSearchStore = useProductSearchStore()

const search = computed({
  get () {
    return productSearchStore.productSearch
  },

  set (searchText) {
    debounceSearch(searchText)
  }
})

function debounceSearch (searchText: string) {
  inputTime = Date.now()
  setTimeout(checkDelay, delayMS, searchText)

  function checkDelay (searchText: string) {
    const isDelayEnough = Date.now() - inputTime >= delayMS

    if (isDelayEnough) {
      productSearchStore.setProductSearch(searchText)
    }
  }
}
</script>
