<template>
  <v-btn @click="openProductDialog" color="primary" dark fab x-small>
    <v-icon>{{ mdiPlus }}</v-icon>
  </v-btn>
</template>

<script>
import { mapMutations } from 'vuex'
import { mdiPlus } from '@mdi/js'

export default {
  data: () => ({
    mdiPlus
  }),

  methods: {
    ...mapMutations(['setStateObject']),

    openProductDialog: function () {
      const status = {
        objectName: 'status',
        state: { productDialogIsOpened: true }
      }
      this.setStateObject(status)
    }
  }
}
</script>
