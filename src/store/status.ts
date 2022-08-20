import { defineStore } from 'pinia'
import { ref } from 'vue'
import { IStatusStore } from './status.types'

export const useStatusStore = defineStore('status', (): IStatusStore => {
  const isVertical = ref(false)

  return { isVertical }
})
