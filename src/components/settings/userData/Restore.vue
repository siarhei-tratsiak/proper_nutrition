<template>
  <v-file-input
    accept="application/JSON"
    class="mt-6"
    filled
    @change="restoreDB"
    :label="$t('settings.restore')"
    type="file"
  />
</template>

<script>
import { mapActions } from 'vuex'

export default {
  methods: {
    ...mapActions(['restoreDB'])
  }
}
</script>
