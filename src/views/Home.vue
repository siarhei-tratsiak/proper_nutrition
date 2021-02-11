<template>
  <div
    class="accent-2 align-center d-flex flex-column green"
    id="background"
  >

    <p class="align-center d-flex flex-grow-1">НАЖМИТЕ КНОПКУ</p>

    <RunButton v-if="isReady" />

    <p class="d-flex flex-grow-1 align-center">
      ЧТОБЫ ВЫЧИСЛИТЬ РАЦИОН ЗА ПЕРИОД:
    </p>

    <SelectPeriod />

  </div>
</template>

<script>
import ReadinessCheck from '@/mixins/ReadinessCheck'
import RunButton from '@/components/home/RunButton.vue'
import SelectPeriod from '@/components/home/SelectPeriod.vue'

export default {
  components: {
    RunButton,
    SelectPeriod
  },

  mixins: [ReadinessCheck],

  name: 'Home'
}
</script>

<style scoped>
#background {
  height: 100%;
}
</style>
