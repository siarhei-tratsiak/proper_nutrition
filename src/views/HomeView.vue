<template>
  <div
    class="accent-2 align-center d-flex flex-column green"
    id="background"
    v-if="isReady"
  >
    <p class="align-center d-flex flex-grow-1 text-center">
      {{ $t('runButtonInstructions[0]') }}
    </p>

    <RunButton />

    <p class="align-center d-flex flex-grow-1 text-center">
      {{ $t('runButtonInstructions[1]') }}
    </p>

    <SelectPeriod />
  </div>
</template>

<script lang="ts" setup>
import RunButton from '@/components/home/RunButton.vue'
import SelectPeriod from '@/components/home/SelectPeriod.vue'

const isReady = true
</script>

<style scoped>
#background {
  height: 100%;
}

p {
  margin: 0 0.5em;
  text-transform: uppercase;
}
</style>
