<template lang="html">
  <div>
    <ResultProductsList></ResultProductsList>
    <br />
    <NutrientsBalance></NutrientsBalance>
  </div>
</template>

<script>
import ResultProductsList from "@/components/result/ResultProductsList.vue";
import NutrientsBalance from "@/components/result/NutrientsBalance.vue";

export default {
  components: {
    ResultProductsList,
    NutrientsBalance
  }
};
</script>
