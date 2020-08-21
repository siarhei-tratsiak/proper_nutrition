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
import { forDatePicker, getToday, getYear } from "@/api/getDates.js";

export default {
  computed: {
    ...mapState(["settings"]),

    date: {
      get: function() {
        return forDatePicker(this.settings.birthdate);
      },
      set: function(value) {
        const birthdate = Date.parse(value);
        this.setSettings({ birthdate });
        const payload = { nutrientIDs: [1008, 1087, 1089, 1114, 1090] };
        this.setConstraints(payload);
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
    ...mapActions(["setConstraints", "setSettings"]),

    maxDate() {
      const today = getToday();
      const year = getYear();
      const maxDate = today - 17 * year;
      return forDatePicker(maxDate);
    },

    save(date) {
      this.$refs.menu.save(date);
    }
  }
};
</script>

<style lang="css" scoped></style>
