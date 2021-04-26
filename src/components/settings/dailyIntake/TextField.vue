<template>
  <v-form class="flex-grow-1" v-model="valid">
    <v-text-field
      @change="update"
      class="ma-1"
      dense
      :disabled="isMin ? !extremum.min_mutable : !extremum.max_mutable"
      filled
      :label="isMin ? $t('intake.label.from') : $t('intake.label.to')"
      :rules="rules"
      type="number"
      :value="getValue()"
    ></v-text-field>
  </v-form>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  computed: {
    rules: function () {
      const numeric = this.$t('rules.numeric')
      const positive = this.$t('rules.positive')
      const lessMin = this.$t('rules.lessMin')
      return [
        value => !isNaN(value) || numeric,
        value => +value >= 0 || positive,
        value => ((this.isMin || !value)
          ? true
          : +value >= this.extremum.min) || lessMin
      ]
    }
  },

  data: function () {
    return {
      valid: true
    }
  },

  methods: {
    ...mapActions(['updateConstraint']),

    getValue: function () {
      const value = this.isMin ? this.extremum.min : this.extremum.max
      return value ? +value.toFixed(1) : value
    },

    update: function (value) {
      if (this.valid) {
        const payload = { id: this.extremum.id }
        const extremum = value === '' ? null : +value
        payload.value = this.isMin ? { min: extremum } : { max: extremum }
        this.updateConstraint(payload)
      }
    }
  },

  props: ['extremum', 'isMin']
}
</script>
