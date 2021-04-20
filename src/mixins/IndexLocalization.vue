<script>
export default {
  methods: {
    localize: function (language) {
      document.documentElement.lang = language
      document.title = this.$t('title')
    }
  }
}
</script>
