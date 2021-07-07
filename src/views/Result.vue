<template lang="html">
  <div>
    <Alert />
    <ResultProductsList />
    <NutrientsBalance v-if="isReady" />
  </div>
</template>

<script>
import Alert from '@/components/result/Alert'
import NutrientsBalance from '@/components/result/NutrientsBalance'
import ReadinessCheck from '@/mixins/ReadinessCheck'
import ResultProductsList from '@/components/result/ResultProductsList'

export default {
  components: {
    Alert,
    NutrientsBalance,
    ResultProductsList
  },

  mixins: [ReadinessCheck]
}
</script>
