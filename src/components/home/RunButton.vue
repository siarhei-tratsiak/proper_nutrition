<template>
  <div class="align-center d-flex justify-center">
    <v-btn
      @click="click"
      color="primary"
      icon
      id="run_button"
      :loading="statusStore.isLoading"
    >
      <v-icon
        color="white"
        :size="size"
      >
        mdi-room-service
      </v-icon>

      <template #loader>
        <v-icon
          color="white"
          :size="size"
        >
          mdi-timer-sand
        </v-icon>
      </template>
    </v-btn>
  </div>
</template>

<script lang="ts" setup>
/* import { onBeforeUnmount, onMounted } from 'vue'
import { debounce } from 'lodash' */
import { useStatusStore } from '@/store/status/status'
import { useIntervalStore } from '@/store/interval/interval'

/* const delayMS = 300
const listener = debounce(onResize, delayMS) */
const statusStore = useStatusStore()
const periodStore = useIntervalStore()

const size = '12vmin'

/* onMounted(() => {
  window.addEventListener('resize', listener)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', listener)
})

let progressSize = countProgressSize()
function onResize () {
  progressSize = countProgressSize()
}

function countProgressSize () {
  const progressRibbonWidthMultiplier = 0.2

  return Math.min(window.innerHeight, window.innerWidth) *
    progressRibbonWidthMultiplier
} */

function click () {
  statusStore.setIsLoading(true)
  periodStore.setDays()
  setTimeout(() => {
    // getSolution()
  }, 0) // allows loader to be shown
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
