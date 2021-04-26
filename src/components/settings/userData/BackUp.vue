<template>
  <v-btn @click="makeBackUp">
    {{ $t('settings.backup') }}
  </v-btn>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  methods: {
    ...mapActions(['makeBackUp'])
  }
}
</script>
