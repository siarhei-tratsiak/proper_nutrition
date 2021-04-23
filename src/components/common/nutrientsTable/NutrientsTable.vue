<template>
  <v-data-table
    class="nutrients-table"
    disable-pagination
    group-by="isMain"
    group-desc
    :header-props="{'sort-by-text': $t('table.sortBy')}"
    :headers="headers"
    hide-default-footer
    item-key="name"
    :items="nutrients"
    :mobile-breakpoint="mobileBreakpoint"
  >
    <template #[`group.header`]="{ group, headers, isOpen, toggle }">
      <td :colspan="headers.length">
        <v-btn
          @click="toggle"
          icon
          :ref="group ? 'main' : 'additional'"
          small
        >
          <v-icon v-if="isOpen">{{ mdiMinus }}</v-icon>
          <v-icon v-else>{{ mdiPlus }}</v-icon>
        </v-btn>

        {{
          group ?
          $t('nutrients.group.main') :
          $t('nutrients.group.additional')
        }}
      </td>
    </template>

    <template #[`item.name`]="{ item }">
      <router-link
        :to="{
          name: 'ProductsByNutrient',
          query: { nutrient_id: item.id }
        }"
      >
        {{ item.name }}
      </router-link>
    </template>

    <template #[`item.value`]="{ item }">
      <ProgressBarCell :nutrient="item"></ProgressBarCell>
    </template>
  </v-data-table>
</template>

<script>
import ProgressBarCell from '@/components/common/nutrientsTable/ProgressBarCell'
import { mdiMinus, mdiPlus } from '@mdi/js'

export default {
  components: {
    ProgressBarCell
  },

  data: function () {
    return {
      headers: [
        { text: this.$t('nutrients.headers.name'), value: 'name' },
        { text: this.$t('nutrients.headers.value'), value: 'value' },
        { text: this.$t('nutrients.headers.units'), value: 'units' }
      ],
      mdiMinus,
      mdiPlus,
      mobileBreakpoint: '600'
    }
  },

  methods: {
    _clickAdditional: function () {
      this.$refs.additional.$el.click()
    }
  },

  mounted () {
    this._clickAdditional()
  },

  props: ['nutrients']
}
</script>

<style>
  .nutrients-table .v-data-table__mobile-table-row {
    display: grid;
    grid-template-areas:
      "name unit"
      "bar bar";
    grid-template-columns: 1fr 1fr;
  }

  .nutrients-table .v-data-table__mobile-row:nth-of-type(1) {
    grid-area: name;
  }

  .nutrients-table
  .v-data-table__mobile-row:nth-of-type(1)
  .v-data-table__mobile-row__cell {
    text-align: left;
  }

  .nutrients-table .v-data-table__mobile-row:nth-of-type(2) {
    border-bottom: thin solid rgba(0, 0, 0, 0.12);
    grid-area: bar;
  }

  .nutrients-table .v-data-table__mobile-row:nth-of-type(3) {
    border-bottom: none !important;
    grid-area: unit;
  }

  .nutrients-table .v-data-table__mobile-row__header {
    display: none;
  }
</style>
