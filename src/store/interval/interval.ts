import { defineStore } from 'pinia'
import { ref } from 'vue'
import DatesService from '@/services/interval/inverval'

export const useIntervalStore = defineStore('interval', () => {
  const start = ref(0)
  const end = ref(0)
  const days = ref(1)
  const id = ref(0)
  const datesService = new DatesService(start.value, end.value)

  function setDays () {
    days.value = datesService.getDays()
  }

  return {
    id,
    setDays
  }
})
