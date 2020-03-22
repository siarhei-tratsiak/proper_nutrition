<template>
  <v-btn
    bottom
    @click="getSolution()"
    color="primary"
    dark
    fab
    fixed
    id="run_button"
    :loading="this.status.counting"
    right
  >
    <v-icon>room_service</v-icon>
  </v-btn>
</template>

<script>

import {mapActions, mapState} from 'vuex';

export default {

  computed: {
    ...mapState(['status']),
  },

  methods: {
    ...mapActions(['getSolution']),
  },

};

</script>

<style scoped>
#run_button {
  z-index: 7;
}
</style>
