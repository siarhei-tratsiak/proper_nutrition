<script>
export default {
  methods: {
    getDates: function() {
      const msInDay = 24 * 60 * 60 * 1000;
      const now = new Date();
      const today = now - (now % msInDay);
      const end = today + msInDay;
      return { msInDay, now, today, end };
    }
  }
};
</script>
