<template>
  <v-card>
    <v-card-title>
      {{ $t('result.nutrientsHeader', { recommendations: "" }) }}
    </v-card-title>

    <NutrientsTable :nutrients='nutrients()'/>
  </v-card>
</template>

<script>
import GetNutrientsBalance from '@/mixins/GetNutrientsBalance'
import NutrientsTable from '@/components/common/nutrientsTable/NutrientsTable'

export default {
  components: {
    NutrientsTable
  },

  mixins: [GetNutrientsBalance]
}
</script>
