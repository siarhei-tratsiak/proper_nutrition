<template>
  <v-btn class="ma-2" @click="switchLock(lock)">
    {{ (lock ? "" : $t('intake.un'))+$t('intake.lock') }}

    <v-icon right>
      {{ lock ? mdiLock : mdiLockOpenVariant }}
    </v-icon>
  </v-btn>
</template>

<script>
import { mapActions } from 'vuex'
import { mdiLock, mdiLockOpenVariant } from '@mdi/js'

export default {
  data: () => ({
    mdiLock,
    mdiLockOpenVariant
  }),

  methods: {
    ...mapActions(['switchLock'])
  },

  props: ['lock']
}
</script>
