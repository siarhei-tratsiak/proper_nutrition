<template>
  <v-progress-linear
    height="12"
    v-model="nutrient.value"
  >
      <strong>{{  nutrient.valueAbs.toFixed(2) }}</strong>
  </v-progress-linear>
</template>

<script>
export default {
  props: ['nutrient']
}
</script>

<style>
.v-data-table__mobile-row__cell {
  flex-grow: 1;
  margin-left: 12px;
}
</style>
