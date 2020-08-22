<template>
  <v-btn @click="close">
    <v-icon>mdi-close</v-icon>
  </v-btn>
</template>

<script>
import CloseProductDialog from '@/mixins/CloseProductDialog'

export default {
  mixins: [CloseProductDialog]
}
</script>
