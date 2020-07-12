<template>
  <div class="d-flex flex-column flex-shrink-0 justify-center" id="select-period">
    <div class="d-flex" v-if="showDatePicker">
      <DatePicker :isFrom="true" />
      <DatePicker :isFrom="false" />
    </div>
    <v-select :items="items" label="Период" solo :value="value" @input="input"></v-select>
  </div>
</template>

<script>
import GetDates from "@/mixins/GetDates";
import DatePicker from "@/components/home/DatePicker";
import { mapActions, mapMutations, mapState } from "vuex";

export default {
  components: { DatePicker },

  computed: {
    ...mapState(["period"]),

    showDatePicker: function() {
      return this.value === "Другое";
    },

    value: {
      get: function() {
        return this.period.name;
      },

      set: function(name) {
        this.setPeriod({ name });
      }
    }
  },

  data: function() {
    return {
      items: ["Сегодня", "Неделя", "7 дней", "Месяц", "30 дней", "Другое"]
    };
  },

  methods: {
    ...mapActions(["setRationForPeriod"]),
    ...mapMutations(["setPeriod", "set"]),

    input: function(value) {
      this.value = value;
      const { msInDay, now, today, end } = this.getDates();
      const dayOfWeek = now.getDay() === 0 ? 7 : now.getDay();
      const monday = today - (dayOfWeek - 1) * msInDay;
      const weekAgo = today - 6 * msInDay;
      const dayOfMonth = now.getDate();
      const firstDayOfMonth = today - (dayOfMonth - 1) * msInDay;
      const monthAgo = today - 29 * msInDay;
      let start = today;
      switch (value) {
        case "Неделя":
          start = monday;
          break;
        case "7 дней":
          start = weekAgo;
          break;
        case "Месяц":
          start = firstDayOfMonth;
          break;
        case "30 дней":
          start = monthAgo;
          break;
      }
      this.setPeriod({ start, end });
    }
  },

  mixins: [GetDates]
};
</script>

<style>
#select-period {
  max-width: 300px;
}
</style>
