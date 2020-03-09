<template>
  <v-btn
    dark color="primary"
    fixed
    bottom
    right
    fab
    id="run_button"
    @click="getResult"
  >
    <v-icon>room_service</v-icon>
  </v-btn>
</template>

<script>
import {mapActions, mapMutations} from 'vuex';
export default {
  methods: {
    ...mapActions(['getSolution']),
    ...mapMutations(['setPanel']),
    getResult: function() {
      this.getSolution();
      this.wrapResultPanel();
    },
    wrapResultPanel: function() {
      const panel = this.$store.state.panel;
      if (panel.indexOf(1) === -1) {
        this.setPanel(panel.push(1));
      }
    },
  },
};
</script>

<style scoped>
#run_button {
  z-index: 7;
}
</style>
