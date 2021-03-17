<template>
  <div class="progress-bar-cell">
    <BorderMarker :isMin="true" :nutrient="nutrient" v-if="nutrient.minAbs" />
    <BorderMarker :isMin="false" :nutrient="nutrient" v-if="nutrient.maxAbs" />
    <ProgressBar :nutrient="nutrient"></ProgressBar>
  </div>
</template>

<script>
import BorderMarker from '@/components/nutrientsTable/BorderMarker'
import ProgressBar from '@/components/nutrientsTable/ProgressBar'

export default {
  components: { BorderMarker, ProgressBar },

  props: ['nutrient']
}
</script>

<style scoped>
.progress-bar-cell {
  margin-right: 10px;
  position: relative;
}
</style>
