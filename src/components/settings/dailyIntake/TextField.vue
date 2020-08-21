<template>
  <v-text-field
    dense
    :disabled="isMin ? !extremum.min_mutable : !extremum.max_mutable"
    filled
    :label="isMin ? 'от: ' : 'до: '"
    :rules="rules"
    :value="isMin ? extremum.min : extremum.max"
    class="ma-1"
    @change="update"
  ></v-text-field>
</template>

<script>
import { mapActions } from "vuex";

export default {
  data: function() {
    return {
      rules: [
        value => (!isNaN(parseFloat(+value)) && isFinite(+value)) || "Не число",
        value => +value >= 0 || "Меньше нуля",
        value =>
          (this.isMin ? true : +value >= this.extremum.min) || "Меньше минимума"
      ]
    };
  },

  methods: {
    ...mapActions(["updateConstraint"]),

    update(value) {
      const payload = { id: this.extremum.id };
      const extremum = value === "" ? value : +value;
      payload.value = this.isMin ? { min: extremum } : { max: extremum };
      this.updateConstraint(payload);
    }
  },

  props: ["extremum", "isMin"]
};
</script>
