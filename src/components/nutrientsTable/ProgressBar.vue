<template>
  <v-tooltip bottom>
    <template v-slot:activator="{ on, attrs }">
      <v-progress-linear
        height="10"
        :value="nutrient.value"
        v-bind="attrs"
        v-on="on"
      ></v-progress-linear>
    </template>
    <span>{{ Number.parseFloat(nutrient.valueAbs).toFixed(2) }}</span>
  </v-tooltip>
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
