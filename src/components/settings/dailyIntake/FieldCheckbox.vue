<template>
  <v-checkbox hide-details off-icon="mdi-lock" on-icon="mdi-lock-open-variant" v-model="isChecked"></v-checkbox>
</template>

<script>
import { mapActions } from "vuex";

export default {
  computed: {
    isChecked: {
      get: function() {
        return !!this.mutableData[this.mutableFieldName];
      },
      set: function(value) {
        const payload = { id: this.mutableData.id, value: {} };
        payload.value[this.mutableFieldName] = +value;
        this.updateConstraint(payload);
      }
    }
  },

  methods: {
    ...mapActions(["updateConstraint"])
  },

  props: ["mutableData", "mutableFieldName"]
};
</script>
