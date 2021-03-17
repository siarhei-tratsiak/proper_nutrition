<template lang="html">
  <v-card>
    <v-card-title>Продукты к употреблению за выбранный период:</v-card-title>

    <v-data-table
      :headers="headers"
      hideDefaultFooter
      id="result-products-list"
      :items="items"
      :itemsPerPage="itemsPerPage"
      :no-data-text="noDataText"
    >
      <template v-slot:item.name="{ item }">
        <router-link :to="{ name: 'Product', params: { id: item.id } }">
          {{ item.name }}
        </router-link>
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters(['getResultProducts']),

    items: function () {
      return this.getResultProducts()
    }
  },

  data: () => ({
    headers: [
      { text: 'Название', value: 'name' },
      { text: 'Масса, г', value: 'mass' }
    ],
    itemsPerPage: -1,
    noDataText: 'Нет данных'
  })
}
</script>
