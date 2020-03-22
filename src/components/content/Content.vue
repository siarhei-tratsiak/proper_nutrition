<template lang="html">
  <v-card>
      <ProductsListPanel/>
      <ResultPanel/>
  </v-card>
</template>

<script>
import ProductsListPanel from
  '@/components/content/products_list/ProductsListPanel';
import ResultPanel from '@/components/content/result/ResultPanel';

export default {

  components: {
    ProductsListPanel,
    ResultPanel,
  },

};
</script>

<style lang="css" scoped>
</style>
