import { defineStore } from 'pinia'
import { ref } from 'vue'
import { IStatusStore } from './status.types'

export const useStatusStore = defineStore('status', (): IStatusStore => {
  const isVertical = ref(false)

  function setIsVertical (value: boolean) {
    isVertical.value = value
  }

  const isLoading = ref(false)

  function setIsLoading (value: boolean) {
    isLoading.value = value
  }

  return {
    isLoading,
    isVertical,
    setIsLoading,
    setIsVertical
  }
})
