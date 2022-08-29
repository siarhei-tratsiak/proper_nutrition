<template>
  <div
    class="d-flex flex-column flex-shrink-0 justify-center"
    id="select-period"
  >
    <!--<div class="d-flex" v-if="showDatePicker">
      <DatePicker :isFrom="true" />
      <DatePicker :isFrom="false" />
    </div>

    <v-select
      :items="periods"
      item-text="name"
      item-value="id"
      :label="label"
      solo
      v-model="interval"
    ></v-select>-->
  </div>
</template>

<script lang="ts" setup>
/* import { computed } from 'vue'
import { usePeriodStore } from '@/store/period/period'
import { useI18n } from 'vue-i18n'
// import { dates } from '@/api/dates'

const periodStore = usePeriodStore()
const { t } = useI18n()
const datesService = new DatesService(start.value, end.value)

const periods = computed(() => [
  { id: 0, name: t('periods.today') },
  { id: 1, name: t('periods.monday') },
  { id: 2, name: t('periods.sevenDays') },
  { id: 3, name: t('periods.fromTheFirst') },
  { id: 4, name: t('periods.thirtyDays') },
  { id: 5, name: t('periods.other') }
])

const interval = computed({
  get() {
    const id = periodStore.id
    const period = periods.value.find(period => period.id === id)

    return period
  },

  set(id) {
    const end = dates.getTomorrow()
    const start = this._getStart(id)
    const payload = { objectName: 'period', state: { start, end, id } }
    this.setStateObject(payload)
    this.setRationForPeriod()
  }
})

  computed: {

    interval: {

    },

    label: function () {
      return this.$t('periodLabel')
    },

    showDatePicker: function () {
      return this.period.id === 5
    }
  },

  created: function () {
    const isNoPeriod = this.period.id === null
    if (isNoPeriod) {
      const start = dates.getToday()
      const end = dates.getTomorrow()
      const payload = {
        objectName: 'period',
        state: { start, end, id: this.periods[0].id }
      }
      this.setStateObject(payload)
      this.setRationForPeriod()
    }
  },

  methods: {
    ...mapActions(['setRationForPeriod']),
    ...mapMutations(['setStateObject']),

    _getStart: function (periodID) {
      const msInDay = dates.getMsInDay()
      const now = new Date()
      const today = dates.getToday()
      let start = today
      switch (periodID) {
        case 1:
          start = this._getMonday(now, today, msInDay)
          break
        case 2:
          start = this._getWeekAgo(today, msInDay)
          break
        case 3:
          start = this._getFirstDayOfMonth(now, today, msInDay)
          break
        case 4:
          start = this._getMonthAgo(today, msInDay)
      }
      return start
    },

    _getMonday: function (now, today, msInDay) {
      const dayOfWeek = now.getDay() === 0 ? 7 : now.getDay()
      const monday = today - (dayOfWeek - 1) * msInDay
      return monday
    },

    _getWeekAgo: function (today, msInDay) {
      const weekAgo = today - 6 * msInDay
      return weekAgo
    },

    _getFirstDayOfMonth: function (now, today, msInDay) {
      const dayOfMonth = now.getDate()
      const firstDayOfMonth = today - (dayOfMonth - 1) * msInDay
      return firstDayOfMonth
    },

    _getMonthAgo: function (today, msInDay) {
      const monthAgo = today - 29 * msInDay
      return monthAgo
    }
  }
} */
</script>

<style>
#select-period {
  max-width: 300px;
}
</style>
