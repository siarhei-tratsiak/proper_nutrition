import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useProductSearchStore = defineStore('productSearch', () => {
  const productSearch = ref('')

  function setProductSearch (value: string) {
    productSearch.value = value
  }

  return {
    productSearch,
    setProductSearch
  }
})
