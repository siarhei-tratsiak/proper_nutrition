<template>
  <v-menu
    v-model="menu"
    :close-on-content-click="false"
    :nudge-right="40"
    transition="scale-transition"
    offset-y
    min-width="290px"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-text-field
        :class="textFieldClass"
        v-model="date"
        :label="label"
        prepend-icon="mdi-calendar"
        readonly
        outlined
        v-bind="attrs"
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

export default {
  computed: {
    ...mapState(['period']),

    label: function () {
      return this.isFrom ? 'С' : 'По'
    },

    textFieldClass: function () {
      return { 'ml-2': !this.isFrom, 'mr-2': this.isFrom }
    }
  },

  data: function () {
    return {
      date: new Date().toISOString().substr(0, 10),
      menu: false
    }
  },

  methods: {
    ...mapActions(['setRationForPeriod']),
    ...mapMutations(['setPeriod']),

    allowedDates (date) {
      if (this.isFrom) {
        const to = this.period.end
        return Date.parse(date) < to
      } else {
        const from = this.period.start
        return Date.parse(date) >= from
      }
    },

    input (date) {
      this.menu = false
      const formattedDate = Date.parse(date)
      const period = {}
      if (this.isFrom) {
        period.start = formattedDate
      } else {
        const msInDay = 24 * 60 * 60 * 1000
        period.end = formattedDate + msInDay
      }
      this.setPeriod(period)
    }
  },

  props: ['isFrom']
}
</script>

<style></style>
