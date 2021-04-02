<template>
  <v-text-field
    @change="setWeight"
    filled
    label="Вес: "
    :rules="rules"
    suffix="кг"
    :value="settings.weight"
  ></v-text-field>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  computed: {
    ...mapState(['settings'])
  },

  data: () => ({
    rules: [
      value => !!value || 'Обязательное поле',
      value => !isNaN(value) || 'Не число',
      value => +value > 0 || 'Не больше 0'
    ]
  }),

  methods: {
    ...mapActions(['setConstraints', 'setSettings']),

    setWeight: function (weight) {
      this.setSettings({ weight: +weight })
      const payload = { nutrientIDs: [1003, 1004, 1005, 1008] }
      this.setConstraints(payload)
    }
  }
}
</script>
