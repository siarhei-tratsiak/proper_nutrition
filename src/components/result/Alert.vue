<template>
    <v-alert
      type="warning"
      v-if='status.resultStatus !== 0'
    >
      {{ message }}
    </v-alert>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState(['status']),

    message: function () {
      if (this.status.resultStatus === null) {
        return this.$t('alert')
      } else {
        return `${this.$t('alert')}${this.$t('advice')}`
      }
    }
  }
}
</script>

<style scoped>
  .v-alert {
    margin: 8px;
  }
</style>
