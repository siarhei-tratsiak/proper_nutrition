<template>
  <v-btn class="ma-2" @click="switchLock(lock)" depressed>
    {{ lock ? "" : "раз" }}блокировать все

    <v-icon right>
      mdi-lock{{ lock ? "" : "-open-variant" }}
    </v-icon>
  </v-btn>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  methods: {
    ...mapActions(['switchLock'])
  },

  props: ['lock']
}
</script>
