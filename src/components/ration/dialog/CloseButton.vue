<template>
  <v-btn @click="close">
    <v-icon>{{ mdiClose }}</v-icon>
  </v-btn>
</template>

<script>
import CloseProductDialog from '@/mixins/CloseProductDialog'
import { mdiClose } from '@mdi/js'

export default {
  data: () => ({
    mdiClose
  }),

  mixins: [CloseProductDialog]
}
</script>
