<template lang="html">
  <v-card>
    <v-card-title>
      Баланс нутриентов в рационе с учетом рекомендаций:
    </v-card-title>

    <NutrientsTable :nutrients='nutrients'/>
  </v-card>
</template>

<script>
import GetNutrientsBalance from '@/mixins/GetNutrientsBalance'
import NutrientsTable from '@/components/nutrientsTable/NutrientsTable'

export default {
  components: {
    NutrientsTable
  },

  mixins: [GetNutrientsBalance]
}
</script>
