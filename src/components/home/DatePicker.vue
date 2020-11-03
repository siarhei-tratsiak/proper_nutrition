<template>
  <v-menu
    class="menu-class"
    :nudge-right="40"
    min-width="290px"
    offset-y
    transition="scale-transition"
    v-model="menu"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-text-field
        :class="textFieldClass"
        :label="label"
        outlined
        prepend-icon="mdi-calendar"
        readonly
        v-bind="attrs"
        v-model="date"
        v-on="on"
      ></v-text-field>
    </template>
    <v-date-picker
      :allowed-dates="allowedDates"
      first-day-of-week="1"
      @input="input"
      locale="ru-ru"
      no-title
      v-model="date"
    ></v-date-picker>
  </v-menu>
</template>

<script>
import { mapActions, mapMutations, mapState } from 'vuex'
import { formatDateForPicker, getMsInDay } from '@/api/dates'

export default {

  computed: {

    ...mapState(['period']),

    label: function () {
      return this.isFrom ? 'С' : 'По'
    },

    textFieldClass: function () {
      return this.isFrom ? 'mr-2' : 'ml-2'
    }

  },

  data: function () {
    return {
      date: formatDateForPicker(),
      menu: false
    }
  },

  methods: {

    ...mapActions(['setRationForPeriod']),
    ...mapMutations(['setPeriod']),

    allowedDates (date) {
      const parsedDate = this._parsedDate(date)
      const isDateAllowed = this.isFrom ? this._isDateLess(parsedDate) : this._isDateNotLess(parsedDate)
      return isDateAllowed
    },

    _getPeriod (date) {
      const period = {}
      const parsedDate = this._parsedDate(date)
      if (this.isFrom) {
        period.start = parsedDate
      } else {
        const msInDay = getMsInDay()
        period.end = parsedDate + msInDay
      }
      return period
    },

    _isDateLess (parsedDate) {
      const to = this.period.end
      const isDateLess = parsedDate < to
      return isDateLess
    },

    _isDateNotLess (parsedDate) {
      const from = this.period.start
      const isDateNotLess = parsedDate >= from
      return isDateNotLess
    },

    input (date) {
      const period = this._getPeriod(date)
      this.setPeriod(period)
    },

    _parsedDate (date) {
      const parsedDate = Date.parse(date)
      return parsedDate
    }

  },

  props: ['isFrom']

}
</script>

<style></style>
