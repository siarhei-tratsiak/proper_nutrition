<template>
  <div>
    <v-card v-if="isReady">
      <Calendar />
      <RationTable />
      <ProductDialog />
    </v-card>
  </div>
</template>

<script>
import Calendar from '@/components/ration/Calendar'
import ProductDialog from '@/components/ration/dialog/ProductDialog'
import RationTable from '@/components/ration/RationTable'
import ReadinessCheck from '@/mixins/ReadinessCheck'

export default {
  components: {
    Calendar,
    ProductDialog,
    RationTable
  },

  mixins: [ReadinessCheck]
}
</script>
