<template>
  <div
    class="align-end border-marker d-flex flex-column"
    :style="{ width: width + '%' }"
  >
    <span class="border-marker-item">
      {{
        isMin ?
        $t('extremum.min') :
        $t('extremum.max')
      }}
    </span>
    <span class="border-marker-item marker"></span>
    <span class="border-marker-item">{{ abs.toFixed(1) }}</span>
  </div>
</template>

<script>
export default {
  data: function () {
    const minData = {
      abs: this.nutrient.minAbs,
      width: this.nutrient.min
    }
    const maxData = {
      abs: this.nutrient.maxAbs,
      width: this.nutrient.max
    }
    return this.isMin ? minData : maxData
  },

  props: ['isMin', 'nutrient']
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
