<template>
  <v-card>
    <v-card-title>{{ productName }}</v-card-title>
    <v-card-text>
      <NutrientsTable :productIDs="productID"></NutrientsTable>
    </v-card-text>
  </v-card>
</template>

<script>
import { food as products } from "@/data/food.js";
import NutrientsTable from "@/components/nutrientsTable/NutrientsTable";

export default {
  components: { NutrientsTable },

  computed: {
    productName: function() {
      return products.find(product => product[0] === this.productID)[1];
    }
  },

  data: function() {
    return {
      productID: +this.$route.params.id
    };
  }
};
</script>

<style></style>
