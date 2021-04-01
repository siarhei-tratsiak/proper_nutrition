<template>
  <v-data-table
    class="ration-table"
    :headers="headers"
    hide-default-footer
    :items="ration"
    :no-data-text="noDataText"
  >
    <template v-slot:top>
      <RationTableTop />
    </template>

    <template v-slot:[`item.product_name`]="{ item }">
      <router-link :to="{ name: 'Product', params: { id: item.product_id } }">
        {{ item.product_name }}
      </router-link>
    </template>

    <template v-slot:[`item.actions`]="{ item }">
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

  data: () => ({
    headers: [
      { text: 'Продукт', value: 'product_name' },
      { text: 'Масса, г', value: 'mass' },
      { text: 'Действия', sortable: false, value: 'actions' }
    ],
    noDataText: 'Нет данных'
  }),

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
