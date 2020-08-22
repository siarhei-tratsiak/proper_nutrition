<template lang="html">
  <v-layout align-center justify-space-between fill-height>
    <v-select
      filled
      @change="setGoal"
      :items="items"
      label="Цель:"
      :value="items[settings.goal]"
    >
    </v-select>
  </v-layout>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  computed: {
    ...mapState(['settings'])
  },

  data: () => ({
    items: [
      { text: 'сбросить вес', value: 0 },
      { text: 'сохранить вес', value: 1 },
      { text: 'набрать вес', value: 2 }
    ]
  }),

  methods: {
    ...mapActions(['setConstraints', 'setSettings']),

    setGoal (goal) {
      this.setSettings({ goal })
      const payload = { nutrientIDs: [1008] }
      this.setConstraints(payload)
    }
  }
}
</script>

<style lang="css" scoped></style>
