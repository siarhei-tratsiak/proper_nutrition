<template lang="html">
  <v-menu
    ref="menu"
    v-model="menu"
    :close-on-content-click="false"
    transition="scale-transition"
    offset-y
    min-width="290px"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-text-field
        filled
        v-model="date"
        label="Дата рождения"
        readonly
        v-bind="attrs"
        v-on="on"
      ></v-text-field>
    </template>

    <v-date-picker
      ref="picker"
      v-model="date"
      :max="maxDate()"
      min="1950-01-01"
      locale="ru-ru"
      no-title
      @change="save"
    ></v-date-picker>
  </v-menu>
</template>

<script>
import { mapActions, mapState } from "vuex";
import GetDates from "@/mixins/GetDates";

export default {
  computed: {
    ...mapState(["settings"]),

    date: {
      get: function() {
        return this.forDatePicker(this.settings.birthdate);
      },
      set: function(value) {
        const birthdate = Date.parse(value);
        this.setSettings({ birthdate });
      }
    }
  },

  data: () => ({
    menu: false
  }),

  watch: {
    menu(val) {
      val && setTimeout(() => (this.$refs.picker.activePicker = "YEAR"));
    }
  },

  methods: {
    ...mapActions(["setSettings"]),

    maxDate() {
      const msInDay = this.getMsInDay();
      const today = this.getToday();
      const year = msInDay * 365.25;
      const maxDate = today - 17 * year;
      return this.forDatePicker(maxDate);
    },

    save(date) {
      this.$refs.menu.save(date);
    }
  },

  mixins: [GetDates]
};
</script>

<style lang="css" scoped></style>
