<template>
  <v-data-table
      disable-pagination
      group-by="isMain"
      group-desc
      :headers="headers"
      hide-default-footer
      item-key="name"
      :items="nutrients"
      :mobile-breakpoint="mobileBreakpoint"
    >
      <template v-slot:[`group.header`]="{ group, headers, isOpen, toggle }">
        <td :colspan="headers.length">
          <v-btn
            @click="toggle"
            icon
            :ref="group ? 'main' : 'additional'"
            small
          >
            <v-icon v-if="isOpen">mdi-minus</v-icon>
            <v-icon v-else>mdi-plus</v-icon>
          </v-btn>

          {{ group ? 'основные' : 'дополнительные' }}
        </td>
      </template>

      <template v-slot:[`item.value`]="{ item }">
        <ProgressBarCell :nutrient="item"></ProgressBarCell>
      </template>
    </v-data-table>
</template>

<script>
import ProgressBarCell from '@/components/nutrientsTable/ProgressBarCell.vue'

export default {
  components: {
    ProgressBarCell
  },

  data: () => ({
    headers: [
      { text: 'нутриент', value: 'name' },
      { text: 'в 100 г продукта', value: 'value' },
      { text: 'ед. изм.', value: 'units' }
    ],
    mobileBreakpoint: '600'
  }),

  methods: {
    clickAdditional () {
      this.$refs.additional.$el.click()
    }
  },

  mounted () {
    this.clickAdditional()
  },

  props: ['nutrients']
}
</script>
