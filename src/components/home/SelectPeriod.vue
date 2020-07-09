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
import DatePicker from "@/components/home/DatePicker";
import { mapMutations } from "vuex";

export default {
  components: { DatePicker },

  computed: {
    showDatePicker: function() {
      return this.value === "Другое";
    }
  },

  data: function() {
    return {
      items: ["Сегодня", "Неделя", "7 дней", "Месяц", "30 дней", "Другое"],
      value: "Сегодня"
    };
  },

  methods: {
    ...mapMutations(["setPeriod"]),

    input: function(value) {
      this.value = value;
      const msInDay = 24 * 60 * 60 * 1000;
      const now = new Date();
      const today = now - (now % msInDay);
      const dayOfWeek = now.getDay();
      const monday = today - (dayOfWeek - 1) * msInDay;
      const weekAgo = today - 7 * msInDay;
      const dayOfMonth = now.getDate();
      const firstDayOfMonth = today - (dayOfMonth - 1) * msInDay;
      const monthAgo = today - 30 * msInDay;
      let start = null;
      switch (value) {
        case "Сегодня":
          start = today;
          break;
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
      this.setPeriod({ start });
    }
  }
};
</script>

<style>
#select-period {
  max-width: 300px;
}
</style>
