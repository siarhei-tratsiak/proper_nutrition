<template>
  <v-btn @click="openProductDialog()" color="primary" dark fab x-small>
    <v-icon>mdi-plus</v-icon>
  </v-btn>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  methods: {
    ...mapMutations(['setStatus']),

    openProductDialog () {
      const status = { productDialogIsOpened: true }
      this.setStatus(status)
    }
  }
}
</script>
