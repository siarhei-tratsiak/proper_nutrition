<template>
  <div class="align-center d-flex flex-grow-1 justify-center">
    <v-btn
      @click="click"
      color="primary"
      fab
      id="run_button"
      :loading="this.status.isLoading"
    >
      <v-icon :size="size">mdi-room-service</v-icon>

      <template #loader>
        <v-progress-circular indeterminate :size="progressSize" />
      </template>
    </v-btn>
  </div>
</template>

<script>
import { debounce } from 'lodash'
import { mapActions, mapMutations, mapState } from 'vuex'
import GetNutrientsBalance from '@/mixins/GetNutrientsBalance.vue'

export default {
  beforeDestroy: function () {
    window.removeEventListener('resize', this.listener)
  },

  data: function () {
    return {
      delayMS: 300,
      listener: debounce(this._onResize, this.delayMS),
      progressSize: this._countProgressSize(),
      size: '12vmin'
    }
  },

  computed: {
    ...mapState(['status'])
  },

  methods: {
    ...mapActions(['getSolution']),

    ...mapMutations(['setDays', 'setStateObject']),

    click: function () {
      const payload = {
        objectName: 'status',
        state: { isLoading: true }
      }
      this.setStateObject(payload)
      this.setDays()
      this.getSolution(this.nutrients())
    },

    _countProgressSize: () => {
      const progressRibbonWidthMultiplier = 0.2
      return Math.min(window.innerHeight, window.innerWidth) * progressRibbonWidthMultiplier
    },

    _onResize: function () {
      this.progressSize = this._countProgressSize()
    }
  },

  mixins: [GetNutrientsBalance],

  mounted: function () {
    window.addEventListener('resize', this.listener)
  }
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
