<template>
  <v-text-field
    filled
    @change="setWeight"
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
      value => (!isNaN(parseFloat(+value)) && isFinite(+value)) || 'Не число',
      value => +value > 0 || 'Не больше нуля'
    ]
  }),

  methods: {
    ...mapActions(['setConstraints', 'setSettings']),

    setWeight: function (weight) {
      this.setSettings({ weight: +weight })
      const payload = { nutrientIDs: [1008] }
      this.setConstraints(payload)
    }
  }
}
</script>
