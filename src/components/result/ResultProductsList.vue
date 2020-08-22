<template lang="html">
  <v-card>
    <v-card-title>Продукты к употреблению за выбранный период:</v-card-title>
    <v-data-table
      :headers="headers"
      hideDefaultFooter
      id="result-products-list"
      :items="items"
      :itemsPerPage="itemsPerPage"
    >
      <template v-slot:item.name="{ item }">
        <router-link :to="{ name: 'Product', params: { id: item.id } }">{{
          item.name
        }}</router-link>
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data () {
    return {
      headers: [
        { text: 'Название', value: 'name' },
        { text: 'Масса, г', value: 'mass' }
      ],
      itemsPerPage: -1
    }
  },
  computed: mapState({
    items: state =>
      state.products.map(product => ({
        id: product.id,
        name: product.name,
        mass: Math.round(product.value * 10) / 10
      }))
  })
}
</script>

<style lang="css" scoped></style>
