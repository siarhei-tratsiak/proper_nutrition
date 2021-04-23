<template>
  <v-card class="ma-1">
    <v-data-table
      class="ration-table"
      :header-props="{'sort-by-text': $t('table.sortBy')}"
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
  </v-card>
</template>

<script>
import RationTableActions from '@/components/ration/rationTable/RationTableActions'
import RationTableTop from '@/components/ration/rationTable/RationTableTop'
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

  .ration-table .v-data-table__mobile-table-row {
    display: grid;
    grid-template-areas:
      "name name"
      "mass actions";
    grid-template-columns: 1fr 1fr;
  }

  .ration-table .v-data-table__mobile-row:nth-of-type(1) {
    grid-area: name;
  }

  .ration-table .v-data-table__mobile-row:nth-of-type(2) {
    grid-area: mass;
  }

  .ration-table .v-data-table__mobile-row:nth-of-type(3) {
    grid-area: actions;
  }

  .ration-table
  .v-data-table__mobile-row:nth-of-type(odd)
  .v-data-table__mobile-row__header {
    display: none;
  }
</style>
