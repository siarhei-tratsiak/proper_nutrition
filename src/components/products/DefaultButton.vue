<template>
  <v-btn @click='restoreDefaults'>
    {{ $t('products.default') }}
  </v-btn>
</template>

<script lang="ts" setup>
import { dbService } from '@/services/db/db'

function restoreDefaults () {
  dbService.toggleSelected()
}
</script>
