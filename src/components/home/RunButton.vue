<template>
  <div class="flex-grow-1 d-flex justify-center align-center">
    <v-btn
      @click="getSolution()"
      color="primary"
      fab
      id="run_button"
      :loading="this.status.counting"
    >
      <v-icon :size="size">mdi-room-service</v-icon>
      <template v-slot:loader>
        <v-progress-circular indeterminate :size="progressSize"></v-progress-circular>
      </template>
    </v-btn>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  data: () => ({
    size: "12vmin"
  }),

  computed: {
    ...mapState(["status"]),
    progressSize: () => Math.min(window.innerHeight, window.innerWidth) * 0.12
  },

  methods: {
    ...mapActions(["getSolution"])
  }
};
</script>

<style scoped>
#run_button {
  border-color: white !important;
  border-style: solid;
  border-width: 1vmin;
  min-height: 30vmin;
  min-width: 30vmin;
  z-index: 7;
}
</style>
