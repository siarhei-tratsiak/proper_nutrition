<template lang="html">
  <div>
    <ResultProductsList></ResultProductsList>
    <br />
    <NutrientsBalance v-if="isReady"></NutrientsBalance>
  </div>
</template>

<script>
import NutrientsBalance from '@/components/result/NutrientsBalance'
import ReadinessCheck from '@/mixins/ReadinessCheck'
import ResultProductsList from '@/components/result/ResultProductsList'

export default {
  components: {
    ResultProductsList,
    NutrientsBalance
  },

  mixins: [ReadinessCheck]
}
</script>
