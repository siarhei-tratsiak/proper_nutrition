<template>
  <v-btn @click="click" :color="text ? 'primary' : ''" depressed>
    {{ text }}
  </v-btn>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  computed: {
    text: function () {
      let text = ''
      if (this.targetData.target === 0) {
        text = 'мин'
      } else if (this.targetData.target === 1) {
        text = 'макс'
      }
      return text
    }
  },

  methods: {
    ...mapActions(['updateConstraint', 'updateTarget']),

    click: function () {
      const payload = { id: this.targetData.id }
      const target = this.targetData.target
      payload.value = { target: +(target === 0) }
      this.updateTarget(payload)
    }
  },

  props: ['targetData']
}
</script>
