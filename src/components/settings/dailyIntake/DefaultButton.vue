<template>
  <v-btn class="ma-2" @click="setAllConstraints">
    {{ $t('intake.default') }}
  </v-btn>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  methods: {
    ...mapActions(['setAllConstraints'])
  }
}
</script>

<style></style>
