<template lang="html">
  <v-data-table id="result-products-list" :headers="headers" :items="items"
   :itemsPerPage="itemsPerPage" hideDefaultFooter dense>

      <!--<thead>
        <tr>
          <th class="text-left">Название</th>
          <th class="text-left">Калории, г</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="product in products" v-bind:key="product.id">
          <td>{{ product.name }}</td>
          <td>{{ product.value | round }}</td>
        </tr>
      </tbody>-->

  </v-data-table>
</template>

<script>
import {mapState} from 'vuex';

export default {
  data() {
    return {
      headers: [
        {text: 'Название', value: 'name'},
        {text: 'Масса, г', value: 'mass'},
      ],
      itemsPerPage: -1,
    };
  },
  computed: mapState({
    items: (state) =>
      state.products.map((product) => ({
        name: product.name,
        mass: Math.round(product.value * 10) / 10,
      })),
  }),
};
</script>

<style lang="css" scoped>
</style>
