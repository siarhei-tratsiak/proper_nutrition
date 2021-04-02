<template>
  <v-text-field
    @change="update"
    class="ma-1"
    dense
    :disabled="isMin ? !extremum.min_mutable : !extremum.max_mutable"
    filled
    :label="isMin ? 'от: ' : 'до: '"
    :rules="rules"
    :value="getValue()"
  ></v-text-field>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  data: function () {
    return {
      rules: [
        value => !isNaN(value) || 'Не число',
        value => +value >= 0 || 'Меньше нуля',
        value =>
          (this.isMin ? true : +value >= this.extremum.min) || 'Меньше минимума'
      ]
    }
  },

  methods: {
    ...mapActions(['updateConstraint']),

    getValue: function () {
      const value = this.isMin ? this.extremum.min : this.extremum.max
      return (value === null) ? value : value.toFixed(1)
    },

    update: function (value) {
      const payload = { id: this.extremum.id }
      const extremum = value === '' ? value : +value
      payload.value = this.isMin ? { min: extremum } : { max: extremum }
      this.updateConstraint(payload)
    }
  },

  props: ['extremum', 'isMin']
}
</script>

<style scoped>
.v-text-field {
  width: calc(100% - 8px);
}
</style>
