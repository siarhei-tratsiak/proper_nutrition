<template>
  <v-progress-linear
    :color="color"
    height="12"
    :striped="!this.nutrient.isMain"
    v-model="nutrient.value"
  >
      <strong>{{ round(nutrient.valueAbs) }}</strong>
  </v-progress-linear>
</template>

<script>
export default {
  computed: {
    color: function () {
      let color = 'primary'
      const roundedValue = this.round(this.nutrient.value)
      const roundedMin = this.round(this.nutrient.min)
      const isLess = roundedValue < (roundedMin || 0)
      if (isLess) {
        color = 'yellow'
      }
      const roundedMax = this.round(this.nutrient.max)
      const isMore = roundedMax && roundedValue > roundedMax
      if (isMore) {
        color = 'red'
      }
      const isNotMain = !this.nutrient.isMain
      if (isNotMain) {
        color = 'grey lighten-1'
      }
      return color
    }
  },

  methods: {
    round: function (value) {
      return Math.round(value * 100) / 100
    }
  },

  props: ['nutrient']
}
</script>

<style>
.v-data-table__mobile-row__cell {
  flex-grow: 1;
  margin-left: 12px;
}
</style>
