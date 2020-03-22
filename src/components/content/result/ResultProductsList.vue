<template lang="html">
  <v-data-table
    dense
    :headers="headers"
    hideDefaultFooter
    id="result-products-list"
    :items="items"
    :itemsPerPage="itemsPerPage">
  </v-data-table>
</template>

<script>
import {mapState} from 'vuex';

export default {
  data() {
    return {
      headers: [
        {text: 'Название', value: 'name'},
        {text: 'Категория', value: 'category'},
        {text: 'Масса, г', value: 'mass'},
      ],
      itemsPerPage: -1,
    };
  },
  computed: mapState({
    items: (state) =>
      state.products.map((product) => ({
        category: product.category,
        name: product.name,
        mass: Math.round(product.value * 10) / 10,
      })),
  }),
};
</script>

<style lang="css" scoped>
</style>
