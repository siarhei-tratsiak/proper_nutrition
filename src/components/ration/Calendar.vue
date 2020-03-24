<template>
    <v-date-picker
        first-day-of-week="1"
        full-width
        locale="ru-ru"
        no-title
        v-model="picker">
    </v-date-picker>
</template>

<script>
import {mapActions, mapMutations, mapState} from 'vuex';

export default {
  computed: {

    ...mapState(['selectedDate']),

    picker: {

      get: function() {
        return this.selectedDate;
      },

      set: function(date) {
        this.setSelectedDate(date);
        this.setRation(date);
      },

    },

  },

  methods: {
    ...mapActions(['setRation']),
    ...mapMutations(['setSelectedDate']),
  },

};
</script>
