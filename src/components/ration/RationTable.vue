<template>
  <v-data-table
    class="ration-table"
    :headers="headers"
    hide-default-footer
    :items="ration"
    :items-per-page="-1"
    :no-data-text="$t('table.noDataText')"
  >
    <template #top>
      <RationTableTop />
    </template>

    <template #[`item.product_name`]="{ item }">
      <router-link :to="{ name: 'Product', params: { id: item.product_id } }">
        {{ item.product_name }}
      </router-link>
    </template>

    <template #[`item.actions`]="{ item }">
      <RationTableActions :item='item' />
    </template>
  </v-data-table>
</template>

<script>
import RationTableActions from '@/components/ration/RationTableActions'
import RationTableTop from '@/components/ration/RationTableTop'
import { mapActions, mapState } from 'vuex'

export default {
  components: {
    RationTableActions,
    RationTableTop
  },

  computed: {
    ...mapState(['ration', 'selectedDate'])
  },

  created: function () {
    this.setRation(this.selectedDate)
  },

  data: function () {
    return {
      headers: [
        {
          text: this.$t('rationTable.headers.product'),
          value: 'product_name'
        },
        {
          text: this.$t('rationTable.headers.mass'),
          value: 'mass'
        },
        {
          text: this.$t('rationTable.headers.actions'),
          sortable: false,
          value: 'actions'
        }
      ]
    }
  },

  methods: {
    ...mapActions(['setRation'])
  }
}
</script>

<style>
.ration-table th:first-of-type {
  width: 100%;
}
</style>
