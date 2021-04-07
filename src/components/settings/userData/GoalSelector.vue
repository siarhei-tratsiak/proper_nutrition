<template>
  <v-layout align-center fill-height justify-space-between>
    <v-select
      @change="setGoal"
      filled
      :items="items"
      :label="$t('settings.goal.label')"
      :value="items[settings.goal]"
    >
    </v-select>
  </v-layout>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  computed: {
    ...mapState(['settings']),

    items: function () {
      const lose = this.$t('settings.goal.lose')
      const keep = this.$t('settings.goal.keep')
      const gain = this.$t('settings.goal.gain')
      return [
        { text: lose, value: 0 },
        { text: keep, value: 1 },
        { text: gain, value: 2 }
      ]
    }
  },

  methods: {
    ...mapActions(['setConstraints', 'setSettings']),

    setGoal: function (goal) {
      this.setSettings({ goal })
      const payload = { nutrientIDs: [1003, 1004, 1005, 1008] }
      this.setConstraints(payload)
    }
  }
}
</script>
