<template>
  <v-layout align-center fill-height justify-space-between >
    <v-select
      @change="update"
      filled
      :items="items"
      :label="$t('settings.activity.label')"
      :value="items[settings.activity]"
    >
    </v-select>

    <v-tooltip top>
      <template #activator="{ on }">
        <v-icon right v-on="on">{{ mdiHelpCircle }}</v-icon>
      </template>

      <i18n path="settings.activity.tooltip.low" tag="p">
        <template #low>
          <strong>{{ $t('settings.activity.low') }}</strong>
        </template>
      </i18n>

      <i18n path="settings.activity.tooltip.medium" tag="p">
        <template #medium>
          <strong>{{ $t('settings.activity.medium') }}</strong>
        </template>
      </i18n>

      <i18n path="settings.activity.tooltip.high" tag="p">
        <template #high>
          <strong>{{ $t('settings.activity.high') }}</strong>
        </template>
      </i18n>
    </v-tooltip>
  </v-layout>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import { mdiHelpCircle } from '@mdi/js'

export default {
  computed: {
    ...mapState(['settings']),

    items: function () {
      const low = this.$t('settings.activity.low')
      const medium = this.$t('settings.activity.medium')
      const high = this.$t('settings.activity.high')
      return [
        { text: low, value: 0 },
        { text: medium, value: 1 },
        { text: high, value: 2 }
      ]
    }
  },

  data: () => ({
    mdiHelpCircle
  }),

  methods: {
    ...mapActions(['setConstraints', 'setSettings']),

    update: function (activity) {
      this.setSettings({ activity })
      const payload = { nutrientIDs: [1008] }
      this.setConstraints(payload)
    }
  }
}
</script>
