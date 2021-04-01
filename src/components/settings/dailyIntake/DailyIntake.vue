<template>
  <v-card class="ma-2">
    <v-card-title>Суточное потребление</v-card-title>
    <v-card-actions class="d-flex flex-wrap justify-center">
      <SwitchLock :lock="true" />
      <SwitchLock :lock="false" />
      <DefaultButton />
    </v-card-actions>
    <v-card-text>
      <v-data-table
        dense
        :headers="headers"
        hide-default-footer
        hide-default-header
        :items="formattedConstraints"
        :items-per-page="itemsPerPage"
        sort-by="name"
      >
        <template v-slot:[`item.name`]="{ item }">
          <span class="block">{{ item.name }}:</span>
        </template>

        <template v-slot:[`item.minData`]="{ item }">
          <TextField class="inline-flex" :extremum="item.minData" :isMin="true" />
          <FieldCheckbox
            class="inline-flex margin-left"
            :mutableData="item.minData"
            mutableFieldName="min_mutable"
          />
        </template>

        <template v-slot:[`item.maxData`]="{ item }">
          <TextField class="inline-flex" :extremum="item.maxData" :isMin="false" />
          <FieldCheckbox
            class="inline-flex margin-left"
            :mutableData="item.maxData"
            mutableFieldName="max_mutable"
          />
        </template>

        <template v-slot:[`item.unit`]="{ item }">
          <span class="block">{{ item.unit }}</span>
        </template>

        <template v-slot:[`item.targetData`]="{ item }">
          <TargetButton class="full-width" :targetData="item.targetData" />
        </template>
      </v-data-table>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import { nutrients } from '@/data/nutrients_ru.js'
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
      return this.constraints.map(constraint => {
        const nutrient = nutrients.find(
          nutrient => nutrient[0] === constraint.nutrient_id
        )
        return {
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
      })
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
    itemsPerPage: -1
  }),

  methods: {
    ...mapActions(['updateConstraint']),

    update: function (value, id, type) {
      const payload = { id }
      payload.value = type === 'min' ? { min: +value } : { max: +value }
      this.updateConstraint(payload)
    }
  }
}
</script>

<style scope>
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

td {
  padding: 0px 4px !important;
}

.margin-left {
  margin-left: -34px;
}
</style>
