<template>
  <v-text-field
    filled
    @change="setHeight"
    label="Рост: "
    :rules="rules"
    suffix="см"
    :value="settings.height"
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

    setHeight (height) {
      this.setSettings({ height: +height })
      const payload = { nutrientIDs: [1008] }
      this.setConstraints(payload)
    }
  }
}
</script>
