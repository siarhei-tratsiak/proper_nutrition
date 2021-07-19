<template>
  <v-snackbar
    class="snackbar"
    multi-line
    :timeout="timeout"
    v-model="snackbar.isOpened"
  >
    {{ snackbar.message }}

    <v-btn @click="exit" v-if="snackbar.isActionExit">
      {{ $t('snackbar.exit') }}
    </v-btn>

    <v-btn @click="isOpened = false" v-else>
      <v-icon>{{ mdiClose }}</v-icon>
    </v-btn>
  </v-snackbar>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
import { mdiClose } from '@mdi/js'
import { App } from '@capacitor/app'

export default {
  computed: {
    ...mapState(['snackbar']),

    isOpened: {
      get: function () {
        return this.state.isOpened
      },

      set: function (isSnackbarOpened) {
        const snackbarPayload = {
          objectName: 'snackbar',
          state: { isOpened: isSnackbarOpened }
        }
        this.setStateObject(snackbarPayload)
      }
    }
  },

  data: function () {
    return {
      mdiClose,
      timeout: 0
    }
  },

  methods: {
    ...mapMutations(['setStateObject']),

    exit: function () {
      App.exitApp()
    }
  }
}
</script>

<style>
  .snackbar {
    word-break: break-all;
  }
</style>
