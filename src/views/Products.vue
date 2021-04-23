<template lang="html">
  <v-card>
    <ProductsHeader />
    <ProductsTable />
  </v-card>
</template>

<script>
import ProductsHeader from '@/components/products/ProductsHeader'
import ProductsTable from '@/components/products/ProductsTable'

export default {
  components: {
    ProductsHeader,
    ProductsTable
  }
}
</script>
