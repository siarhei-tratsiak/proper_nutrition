<template>
  <v-menu
    class="menu-class"
    min-width="290px"
    :nudge-right="nudgeRight"
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
import { dates } from '@/api/dates'
import { mapMutations, mapState } from 'vuex'

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

  data: () => ({
    date: dates.formatDateForPicker(),
    menu: false,
    nudgeRight: 40
  }),

  methods: {
    ...mapMutations(['setStateObject']),

    allowedDates: function (date) {
      const parsedDate = Date.parse(date)
      const isDateAllowed = this._isDateAllowed(parsedDate)
      return isDateAllowed
    },

    _isDateAllowed: function (parsedDate) {
      return this.isFrom
        ? this._isDateLess(parsedDate)
        : this._isDateNotLess(parsedDate)
    },

    _isDateLess: function (parsedDate) {
      const to = this.period.end
      const isDateLess = parsedDate < to
      return isDateLess
    },

    _isDateNotLess: function (parsedDate) {
      const from = this.period.start
      const isDateNotLess = parsedDate >= from
      return isDateNotLess
    },

    input: function (date) {
      const period = this._getPeriod(date)
      const payload = { objectName: 'period', state: period }
      this.setStateObject(payload)
    },

    _getPeriod: function (date) {
      const period = { name: 'Другое' }
      const parsedDate = Date.parse(date)
      if (this.isFrom) {
        period.start = parsedDate
      } else {
        const msInDay = dates.getMsInDay()
        period.end = parsedDate + msInDay
      }
      return period
    }
  },

  props: ['isFrom']
}
</script>

<style></style>
