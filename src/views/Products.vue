<template lang="html">
  <v-card>
    <Header />
    <Table />
  </v-card>
</template>

<script>
import Header from '@/components/products/Header'
import Table from '@/components/products/Table'

export default {
  components: {
    Header,
    Table
  }
}
</script>
