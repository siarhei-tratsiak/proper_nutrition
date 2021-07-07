<template lang="html">
  <v-card>
    <v-card-title>{{ $t('result.title') }}</v-card-title>

    <v-data-table
      :header-props="{'sort-by-text': $t('table.sortBy')}"
      :headers="headers"
      hideDefaultFooter
      id="result-products-list"
      :items="items"
      :itemsPerPage="itemsPerPage"
      mobile-breakpoint="0"
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

<style>
  @media (max-width: 480px) {
    #result-products-list tr td:last-of-type {
      width: 0.1%;
      white-space: nowrap;
    }
  }
</style>
