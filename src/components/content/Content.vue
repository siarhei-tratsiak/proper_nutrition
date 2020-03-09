<template lang="html">
  <v-expansion-panels multiple v-model="panel">
      <ProductsListPanel/>
      <ResultPanel/>
  </v-expansion-panels>
</template>

<script>
import ProductsListPanel from
  '@/components/content/products_list/ProductsListPanel';
import ResultPanel from '@/components/content/result/ResultPanel';
import {mapMutations} from 'vuex';

export default {
  components: {
    ProductsListPanel,
    ResultPanel,
  },
  computed: {
    panel: {
      get() {
        return this.$store.state.panel;
      },
      set(value) {
        this.setPanel(value);
      },
    },
    // ...mapState(['panel']),
  },
  methods: {
    ...mapMutations(['setPanel']),
  },
};
</script>

<style lang="css" scoped>
</style>
