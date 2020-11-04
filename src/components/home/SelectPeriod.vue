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
      :items="items"
      label="Период"
      solo
      :value="interval"
    ></v-select>
  </div>
</template>

<script>
import { getTomorrow, getMsInDay, getToday } from '@/api/dates.js'
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
        this.setPeriod({ name })
      }
    }
  },

  data: function () {
    return {
      items: ['Сегодня', 'Неделя', '7 дней', 'Месяц', '30 дней', 'Другое']
    }
  },

  methods: {
    ...mapActions(['setRationForPeriod']),
    ...mapMutations(['setPeriod', 'set']),

    _getFirstDayOfMonth: function (now, today, msInDay) {
      const dayOfMonth = now.getDate()
      const firstDayOfMonth = today - (dayOfMonth - 1) * msInDay
      return firstDayOfMonth
    },

    _getMonday: function (now, today, msInDay) {
      const dayOfWeek = now.getDay() === 0 ? 7 : now.getDay()
      const monday = today - (dayOfWeek - 1) * msInDay
      return monday
    },

    _getMonthAgo: function (today, msInDay) {
      const monthAgo = today - 29 * msInDay
      return monthAgo
    },

    _getStart: function (interval) {
      const msInDay = getMsInDay()
      const now = new Date()
      const today = getToday()
      let start = today
      switch (interval) {
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

    _getWeekAgo: function (today, msInDay) {
      const weekAgo = today - 6 * msInDay
      return weekAgo
    },

    input: function (interval) {
      this.interval = interval
    },

    _setInterval: function (interval) {
      const end = getTomorrow()
      const start = this._getStart(interval)
      this.setPeriod({ start, end })
    }
  }
}
</script>

<style>
#select-period {
  max-width: 300px;
}
</style>
