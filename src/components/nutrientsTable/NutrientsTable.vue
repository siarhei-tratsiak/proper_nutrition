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
import ProgressBarCell from '@/components/nutrientsTable/ProgressBarCell'
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
