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
          <v-icon right v-on="on">{{ mdiHelpCircle }}</v-icon>
        </template>

        <i18n path="intake.tooltip" tag="p">
          <template #icon>
            <v-icon>{{ mdiLockOpenVariant }}</v-icon>
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
        id="daily-intake"
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
          <div class="d-flex">
            <TextField
              :extremum="item.minData"
              :isMin="true"
            />

            <FieldCheckbox
              :mutableData="item.minData"
              mutableFieldName="min_mutable"
            />
          </div>
        </template>

        <template #[`item.maxData`]="{ item }">
          <div class="d-flex">
            <TextField
              :extremum="item.maxData"
              :isMin="false"
            />

            <FieldCheckbox
              :mutableData="item.maxData"
              mutableFieldName="max_mutable"
            />
          </div>
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
import { mdiHelpCircle, mdiLockOpenVariant } from '@mdi/js'

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
    ],
    mdiHelpCircle,
    mdiLockOpenVariant
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

td {
  padding: 0px 4px !important;
}
</style>

<style>
#daily-intake .v-data-table__mobile-table-row {
  display: grid;
  grid-template-areas:
    "name unit extr"
    "min min min"
    "max max max";
  grid-template-columns: 2fr 1fr 1fr;
}

#daily-intake .v-data-table__mobile-row:nth-of-type(1) {
  grid-area: name;
}

#daily-intake .v-data-table__mobile-row:nth-of-type(2) {
  grid-area: min;
}

#daily-intake .v-data-table__mobile-row:nth-of-type(3) {
  border-bottom: thin solid rgba(0, 0, 0, 0.12);
  grid-area: max;
}

#daily-intake .v-data-table__mobile-row:nth-of-type(4) {
  grid-area: unit;
}

#daily-intake .v-data-table__mobile-row:nth-of-type(5) {
  border-bottom: none !important;
  grid-area: extr;
}
</style>
