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
  },

  methods: {
    ...mapMutations(['setPanel']),
  },

};
</script>

<style lang="css" scoped>
</style>
