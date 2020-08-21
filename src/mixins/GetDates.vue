<script>
export default {
  methods: {
    forDatePicker(date = 0) {
      return new Date(date).toISOString().substr(0, 10);
    },

    getEnd() {
      const msInDay = this.getMsInDay();
      const today = this.getToday();
      const end = today + msInDay;
      return end;
    },

    getMsInDay() {
      return 24 * 60 * 60 * 1000;
    },

    getNow() {
      return new Date();
    },

    getToday() {
      const msInDay = this.getMsInDay();
      const now = this.getNow();
      const today = now - (now % msInDay);
      return today;
    },

    getYear() {
      const msInDay = this.getMsInDay();
      const year = msInDay * 365.25;
      return year;
    }
  }
};
</script>
