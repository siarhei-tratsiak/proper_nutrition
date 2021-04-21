<template>
  <v-form v-model="valid">
    <v-text-field
      @change="setHeight"
      filled
      :label="$t('settings.height.label')"
      :rules="rules"
      :suffix="$t('settings.height.suffix')"
      type="number"
      :value="settings.height"
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

    setHeight (height) {
      if (this.valid) {
        this.setSettings({ height: +height })
        const payload = { nutrientIDs: [1008] }
        this.setConstraints(payload)
      }
    }
  }
}
</script>
