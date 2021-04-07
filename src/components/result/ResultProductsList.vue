<template lang="html">
  <v-card>
    <v-card-title>{{ $t('result.title') }}</v-card-title>

    <v-data-table
      :headers="headers"
      hideDefaultFooter
      id="result-products-list"
      :items="items"
      :itemsPerPage="itemsPerPage"
      :no-data-text="$t('table.noDataText')"
    >
      <template #item.name="{ item }">
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

  data: function () {
    return {
      headers: [
        { text: this.$t('result.headers.name'), value: 'name' },
        { text: this.$t('result.headers.mass'), value: 'mass' }
      ],
      itemsPerPage: -1
    }
  }
}
</script>
