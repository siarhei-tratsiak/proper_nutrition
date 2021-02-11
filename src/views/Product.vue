<template>
  <v-card>
    <v-card-title>{{ productName }}</v-card-title>
    <NutrientsTable :productID="productID"></NutrientsTable>
  </v-card>
</template>

<script>
import { products } from '@/data/products.js'
import NutrientsTable from '@/components/nutrientsTable/NutrientsTable'

export default {
  components: { NutrientsTable },

  computed: {
    productName: function () {
      return products.find(product => product[0] === this.productID)[1]
    }
  },

  data: function () {
    return {
      productID: +this.$route.params.id
    }
  }
}
</script>
