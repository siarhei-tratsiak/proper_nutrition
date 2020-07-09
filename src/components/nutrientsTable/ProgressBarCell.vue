<template>
  <div class="progress-bar-cell">
    <BorderMarker :nutrient="nutrient" :isMin="true"></BorderMarker>
    <BorderMarker v-if="nutrient.maxAbs" :nutrient="nutrient" :isMin="false"></BorderMarker>
    <ProgressBar :nutrient="nutrient"></ProgressBar>
  </div>
</template>

<script>
import BorderMarker from "@/components/nutrientsTable/BorderMarker";
import ProgressBar from "@/components/nutrientsTable/ProgressBar";

export default {
  components: { BorderMarker, ProgressBar },

  props: ["nutrient"]
};
</script>

<style scoped>
.progress-bar-cell {
  position: relative;
}
</style>
