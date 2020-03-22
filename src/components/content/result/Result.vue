<template lang="html">
  <div>
    <ResultProductsList></ResultProductsList>
    <br/>
    <NutrientsBalance></NutrientsBalance>
  </div>
</template>

<script>
import ResultProductsList from
  '@/components/content/result/ResultProductsList.vue';
import NutrientsBalance from
  '@/components/content/result/NutrientsBalance.vue';

export default {
  components: {
    ResultProductsList,
    NutrientsBalance,
  },
};
</script>

<style lang="css" scoped>
</style>
