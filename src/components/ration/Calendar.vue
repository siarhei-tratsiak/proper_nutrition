<template>
  <v-date-picker first-day-of-week="1" full-width locale="ru-ru" no-title v-model="picker"></v-date-picker>
</template>

<script>
import { mapActions, mapMutations, mapState } from "vuex";

export default {
  computed: {
    ...mapState(["isHorizontal", "selectedDate"]),

    picker: {
      get: function() {
        const date = new Date(this.selectedDate).toISOString().substr(0, 10);
        return date;
      },

      set: function(date) {
        this.setSelectedDate(date);
        this.setRation(this.selectedDate);
      }
    }
  },

  created: function() {
    this.setSelectedDate(new Date());
  },

  methods: {
    ...mapActions(["setRation"]),
    ...mapMutations(["setSelectedDate"])
  }
};
</script>
