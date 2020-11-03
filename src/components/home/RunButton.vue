<template>
  <div class="align-center d-flex flex-grow-1 justify-center">
  <v-btn
    @click="getSolution(nutrients)"
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
import { mapActions, mapState } from 'vuex'
import GetNutrientsBalance from '@/mixins/GetNutrientsBalance.vue'

export default {
  data: () => ({
    size: '12vmin'
  }),

  computed: {
    ...mapState(['status']),

    progressSize: () => Math.min(window.innerHeight, window.innerWidth) * 0.12
  },

  methods: {
    ...mapActions(['getSolution'])
  },

  mixins: [GetNutrientsBalance]
}
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
