<template>
  <v-layout align-center fill-height justify-space-between >
    <v-select
      @change="update"
      filled
      :items="items"
      label="Активность:"
      :value="items[settings.activity]"
    >
    </v-select>

    <v-tooltip top>
      <template v-slot:activator="{ on }">
        <v-icon right v-on="on">mdi-help-circle</v-icon>
      </template>

      <p>
        <strong>низкая</strong> - офисный работник, выполняет мало или не
        выполняет упражнения;
      </p>

      <p>
        <strong>средняя</strong> - строитель или человек, бегающий час в день;
      </p>

      <p>
        <strong>высокая</strong> - работник сельского хозяйства (не
        механизированного) или человек, плавающий два часа в день.
      </p>
    </v-tooltip>
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
      { text: 'низкая', value: 0 },
      { text: 'средняя', value: 1 },
      { text: 'высокая', value: 2 }
    ]
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
