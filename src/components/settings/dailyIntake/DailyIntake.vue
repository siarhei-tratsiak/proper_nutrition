<template>
  <v-card class="ma-2">
    <v-card-title>
      {{ $t('intake.title') }}
    </v-card-title>

    <v-card-actions class="d-flex flex-wrap justify-center">
      <SwitchLock :lock="true" />

      <SwitchLock :lock="false" />

      <DefaultButton />

      <v-tooltip>
        <template #activator="{ on }">
          <v-icon right v-on="on">mdi-help-circle</v-icon>
        </template>

        <i18n path="intake.tooltip" tag="p">
          <template #icon>
            <v-icon>mdi-lock-open-variant</v-icon>
          </template>
        </i18n>
      </v-tooltip>
    </v-card-actions>

    <v-card-text>
      <v-data-table
        dense
        :headers="headers"
        hide-default-footer
        hide-default-header
        :items="formattedConstraints"
        :items-per-page="-1"
        sort-by="name"
      >
        <template #[`item.name`]="{ item }">
          <router-link
            class="block"
            :to="{
              name: 'ProductsByNutrient',
              query: { nutrient_id: item.id }
            }"
          >
            {{ item.name }}:
          </router-link>
        </template>

        <template #[`item.minData`]="{ item }">
          <TextField
            class="inline-flex"
            :extremum="item.minData"
            :isMin="true"
          />

          <FieldCheckbox
            class="inline-flex margin-left"
            :mutableData="item.minData"
            mutableFieldName="min_mutable"
          />
        </template>

        <template #[`item.maxData`]="{ item }">
          <TextField
            class="inline-flex"
            :extremum="item.maxData"
            :isMin="false"
          />

          <FieldCheckbox
            class="inline-flex margin-left"
            :mutableData="item.maxData"
            mutableFieldName="max_mutable"
          />
        </template>

        <template #[`item.unit`]="{ item }">
          <span class="block">{{ item.unit }}</span>
        </template>

        <template #[`item.targetData`]="{ item }">
          <TargetButton class="full-width" :targetData="item.targetData" />
        </template>
      </v-data-table>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import { nutrients as nutrientsRU } from '@/data/nutrients_ru'
import { nutrients as nutrientsEN } from '@/data/nutrients_en'
import DefaultButton from '@/components/settings/dailyIntake/DefaultButton'
import FieldCheckbox from '@/components/settings/dailyIntake/FieldCheckbox'
import SwitchLock from '@/components/settings/dailyIntake/SwitchLock'
import TargetButton from '@/components/settings/dailyIntake/TargetButton'
import TextField from '@/components/settings/dailyIntake/TextField'

export default {
  components: {
    DefaultButton,
    FieldCheckbox,
    SwitchLock,
    TargetButton,
    TextField
  },

  computed: {
    ...mapState(['constraints']),

    formattedConstraints: function () {
      return this.constraints.map(this._formattedConstraint)
    }
  },

  data: () => ({
    headers: [
      { value: 'name' },
      { value: 'minData' },
      { value: 'maxData' },
      { value: 'unit' },
      { value: 'targetData' }
    ]
  }),

  methods: {
    ...mapActions(['updateConstraint']),

    _formattedConstraint: function (constraint) {
      const nutrients = this.$i18n.locale === 'ru'
        ? nutrientsRU
        : nutrientsEN
      const nutrient = nutrients.find(
        nutrient => nutrient[0] === constraint.nutrient_id
      )
      return {
        id: nutrient[0],
        name: nutrient[1],
        minData: {
          id: constraint.id,
          min: constraint.min,
          min_mutable: constraint.min_mutable
        },
        maxData: {
          id: constraint.id,
          min: constraint.min,
          max: constraint.max,
          max_mutable: constraint.max_mutable
        },
        unit: nutrient[2],
        targetData: { id: constraint.id, target: constraint.target }
      }
    },

    update: function (value, id, type) {
      const payload = { id }
      payload.value = type === 'min' ? { min: +value } : { max: +value }
      this.updateConstraint(payload)
    }
  }
}
</script>

<style scoped>
.block {
  display: block;
  text-align: center;
}

.full-width {
  width: 100%;
}

.inline-flex {
  display: inline-flex;
}

.margin-bottom {
  margin-bottom: 30px;
}

.margin-left {
  margin-left: -32px;
}

td {
  padding: 0px 4px !important;
}
</style>
