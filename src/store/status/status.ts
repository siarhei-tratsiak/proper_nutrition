import { defineStore } from 'pinia'
import { ref } from 'vue'
import { IStatusStore } from './status.types'

export const useStatusStore = defineStore('status', (): IStatusStore => {
  const isVertical = ref(false)

  function setIsVertical (value: boolean) {
    isVertical.value = value
  }

  return {
    isVertical,
    setIsVertical
  }
})
