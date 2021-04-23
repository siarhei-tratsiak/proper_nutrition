<template>
  <div id="ration" v-if="isReady">
    <Calendar id="ration-calendar" />
    <RationTable id="ration-table" />
    <RationNutrients id="ration-nutrients" />
    <ProductDialog />
  </div>
</template>

<script>
import Calendar from '@/components/ration/Calendar'
import RationNutrients from '@/components/ration/RationNutrients'
import ProductDialog from '@/components/common/dialog/ProductDialog'
import RationTable from '@/components/ration/rationTable/RationTable'
import ReadinessCheck from '@/mixins/ReadinessCheck'

export default {
  components: {
    Calendar,
    ProductDialog,
    RationNutrients,
    RationTable
  },

  mixins: [ReadinessCheck]
}
</script>

<style scoped>
#ration {
  display: grid;
  grid-template-areas:
    "calendar nutrients"
    "ration nutrients";
  grid-template-columns: 1fr 1fr;
  grid-template-rows: auto 1fr;
}

@media (max-width: 600px) {
  #ration {
    grid-template-areas:
      "calendar"
      "ration"
      "nutrients";
    grid-template-columns: 100%;
    grid-template-rows: auto;
  }
}

#ration-calendar {
  grid-area: calendar;
}

#ration-table {
  grid-area: ration;
}

#ration-nutrients {
  grid-area: nutrients;
}
</style>
