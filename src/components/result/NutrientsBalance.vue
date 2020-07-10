<template lang="html">
  <NutrientsTable :productIDs="productIDs" :isResult="true"></NutrientsTable>
</template>

<script>
import { mapState } from "vuex";
import NutrientsTable from "@/components/nutrientsTable/NutrientsTable";

export default {
  components: { NutrientsTable },

  computed: {
    ...mapState(["products"]),

    productIDs: function() {
      return this.products.map(product => product.id);
    }
  }
};
</script>

<style></style>
