<template>
  <v-form v-model="valid">
    <v-text-field
      @change="setWeight"
      filled
      :label="$t('settings.weight.label')"
      :rules="rules"
      :suffix="$t('settings.weight.suffix')"
      :value="settings.weight"
    ></v-text-field>
  </v-form>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  computed: {
    ...mapState(['settings']),

    rules: function () {
      const required = this.$t('rules.required')
      const numeric = this.$t('rules.numeric')
      const positive = this.$t('rules.positive')
      return [
        value => !!value || required,
        value => !isNaN(value) || numeric,
        value => +value > 0 || positive
      ]
    }
  },

  data: function () {
    return {
      valid: true
    }
  },

  methods: {
    ...mapActions(['setConstraints', 'setSettings']),

    setWeight: function (weight) {
      if (this.valid) {
        this.setSettings({ weight: +weight })
        const payload = { nutrientIDs: [1003, 1004, 1005, 1008] }
        this.setConstraints(payload)
      }
    }
  }
}
</script>
