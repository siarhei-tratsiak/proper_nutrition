<template lang="html">
  <div>
    <ResultProductsList></ResultProductsList>
    <br />
    <NutrientsBalance v-if="ready"></NutrientsBalance>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import ResultProductsList from '@/components/result/ResultProductsList.vue'
import NutrientsBalance from '@/components/result/NutrientsBalance.vue'

export default {
  components: {
    ResultProductsList,
    NutrientsBalance
  },

  computed: {
    ...mapState(['settings']),

    ready: function () {
      return !!this.settings.userID
    }
  }
}
</script>
