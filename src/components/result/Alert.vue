<template>
    <v-alert
      type="warning"
      v-if='!status.isResult'
    >
      {{ $t('alert') }}
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
