<template lang="html">
  <div class="">
    <!--<ProductsList></ProductsList>-->
    <div class="" v-if='counting==="finished"'>
      <ResultProductsList></ResultProductsList>
      <br/>
      <NutrientsBalance></NutrientsBalance>
    </div>
    <p class="" v-else-if="counting==='started'">
      Counting...
    </p>
  </div>
</template>

<script>
import {mapActions, mapState} from 'vuex';
// import ProductsList from '@/components/ProductsList.vue'
import ResultProductsList from
  '@/components/content/result/ResultProductsList.vue';
import NutrientsBalance from
  '@/components/content/result/NutrientsBalance.vue';

export default {
  components: {
    // ProductsList,
    ResultProductsList,
    NutrientsBalance,
  },
  /* mounted: async function() {
    this.getSolution()
  },*/
  computed: {
    ...mapState(['counting']),
  },
  methods: {
    ...mapActions(['getSolution']),
  },
};
</script>

<style lang="css" scoped>
</style>
