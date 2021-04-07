<template>
  <v-date-picker
    first-day-of-week="1"
    full-width
    :locale="$i18n.locale"
    no-title
    v-model="picker"
  />
</template>

<script>
import { mapActions, mapMutations, mapState } from 'vuex'

export default {
  computed: {
    ...mapState(['selectedDate']),

    picker: {
      get: function () {
        const dateFormattedForPicker = new Date(this.selectedDate)
          .toISOString()
          .substr(0, 10)
        return dateFormattedForPicker
      },

      set: function (date) {
        this.setSelectedDate(date)
        this.setRation(this.selectedDate)
      }
    }
  },

  created: function () {
    this.setSelectedDate(new Date())
  },

  methods: {
    ...mapActions(['setRation']),

    ...mapMutations(['setSelectedDate'])
  }
}
</script>
