<template>
  <div class="align-end border-marker d-flex flex-column" :style="{ width: width + '%' }">
    <span class="border-marker-item">{{ isMin ? "min" : "max" }}</span>
    <span class="border-marker-item marker"></span>
    <span class="border-marker-item">{{ abs }}</span>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      abs: this.isMin ? this.nutrient.minAbs : this.nutrient.maxAbs,
      width: this.isMin ? this.nutrient.min : this.nutrient.max
    }
  },
  props: ['nutrient', 'isMin']
}
</script>

<style>
.border-marker {
  position: absolute;
  top: -1rem;
  z-index: 1;
}
.border-marker-item {
  font-size: 0.6rem;
  line-height: 1rem;
  transform: translateX(50%);
}
.marker {
  border-left: 1px solid;
  height: 12px;
}
</style>
