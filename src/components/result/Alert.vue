<template>
    <v-alert
      type="warning"
      v-if='!status.isResult'
    >
      Решение не найдено
    </v-alert>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState(['status'])
  }
}
</script>
