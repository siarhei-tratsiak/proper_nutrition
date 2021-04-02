<template>
  <v-layout align-center fill-height justify-space-between>
    <v-select
      @change="setGoal"
      filled
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

    setGoal: function (goal) {
      this.setSettings({ goal })
      const payload = { nutrientIDs: [1003, 1004, 1005, 1008] }
      this.setConstraints(payload)
    }
  }
}
</script>
