<template>
  <div>
    <v-card v-if="isReady">
      <Calendar />
      <RationTable />
      <RationNutrients />
      <ProductDialog />
    </v-card>
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
