<template>
  <v-menu
    :close-on-content-click="false"
    min-width="290px"
    offset-y
    ref="menu"
    transition="scale-transition"
    v-model="menu"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-text-field
        filled
        label="Дата рождения"
        readonly
        v-bind="attrs"
        v-model="date"
        v-on="on"
      ></v-text-field>
    </template>

    <v-date-picker
      @change="save"
      locale="ru-ru"
      :max="maxDate()"
      min="1950-01-01"
      no-title
      ref="picker"
      v-model="date"
    ></v-date-picker>
  </v-menu>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import { dates } from '@/api/dates'

export default {
  computed: {
    ...mapState(['settings']),

    date: {
      get: function () {
        return dates.formatDateForPicker(this.settings.birthdate)
      },

      set: function (value) {
        const birthdate = Date.parse(value)
        this.setSettings({ birthdate })
        const payload = { nutrientIDs: [1008, 1087, 1089, 1114, 1090] }
        this.setConstraints(payload)
      }
    }
  },

  data: () => ({
    menu: false
  }),

  methods: {
    ...mapActions(['setConstraints', 'setSettings']),

    maxDate: function () {
      const today = dates.getToday()
      const year = dates.getMsInYear()
      const maxDate = today - 17 * year
      return dates.formatDateForPicker(maxDate)
    },

    save: function (date) {
      this.$refs.menu.save(date)
    }
  },

  watch: {
    menu: function (val) {
      return val && setTimeout(() => (this.$refs.picker.activePicker = 'YEAR'))
    }
  }
}
</script>
