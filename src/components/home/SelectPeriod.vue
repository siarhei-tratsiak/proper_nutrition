<template>
  <div
    class="d-flex flex-column flex-shrink-0 justify-center"
    id="select-period"
  >
    <div class="d-flex" v-if="showDatePicker">
      <DatePicker :isFrom="true" />
      <DatePicker :isFrom="false" />
    </div>

    <v-select
      @input="input"
      :items="periods"
      label="Период"
      solo
      :value="interval"
    ></v-select>
  </div>
</template>

<script>
import { dates } from '@/api/dates'
import DatePicker from '@/components/home/DatePicker'
import { mapActions, mapMutations, mapState } from 'vuex'

export default {
  components: { DatePicker },

  computed: {
    ...mapState(['period']),

    showDatePicker: function () {
      return this.interval === 'Другое'
    },

    interval: {
      get: function () {
        return this.period.name
      },

      set: function (name) {
        const end = dates.getTomorrow()
        const start = this._getStart(name)
        const payload = { objectName: 'period', state: { start, end, name } }
        this.setStateObject(payload)
      }
    }
  },

  created: function () {
    const start = dates.getToday()
    const end = dates.getTomorrow()
    const payload = { objectName: 'period', state: { start, end } }
    this.setStateObject(payload)
  },

  data: () => ({
    periods: ['Сегодня', 'С понедельника', '7 дней', 'С 1 числа', '30 дней', 'Другое']
  }),

  methods: {
    ...mapActions(['setRationForPeriod']),

    ...mapMutations(['setStateObject']),

    _getStart: function (intervalName) {
      const msInDay = dates.getMsInDay()
      const now = new Date()
      const today = dates.getToday()
      let start = today
      switch (intervalName) {
        case 'Неделя':
          start = this._getMonday(now, today, msInDay)
          break
        case '7 дней':
          start = this._getWeekAgo(today, msInDay)
          break
        case 'Месяц':
          start = this._getFirstDayOfMonth(now, today, msInDay)
          break
        case '30 дней':
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
    },

    input: function (interval) {
      this.interval = interval
    }
  }
}
</script>

<style>
#select-period {
  max-width: 300px;
}
</style>
