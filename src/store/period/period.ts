import { defineStore } from 'pinia'
import { ref } from 'vue'
import DatesService from '@/services/dates/dates'

export const usePeriodStore = defineStore('period', () => {
  const start = ref(0)
  const end = ref(0)
  const days = ref(1)
  const datesService = new DatesService(start.value, end.value)

  function setDays () {
    days.value = datesService.getDays()
  }

  return {
    setDays
  }
})
