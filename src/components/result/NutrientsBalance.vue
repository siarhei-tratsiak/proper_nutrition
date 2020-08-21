<template lang="html">
  <v-card>
    <v-card-title>
      Баланс нутриентов в рационе с учетом рекомендаций:
    </v-card-title>

    <v-data-table
      disable-pagination
      :headers="headers"
      hide-default-footer
      item-key="name"
      :items="nutrients"
      mobile-breakpoint="600"
    >
      <template v-slot:item.value="{ item }">
        <ProgressBarCell :nutrient="item"></ProgressBarCell>
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
import GetNutrientsBalance from "@/mixins/GetNutrientsBalance.vue";
import ProgressBarCell from "@/components/nutrientsTable/ProgressBarCell.vue";

export default {
  components: {
    ProgressBarCell
  },

  mixins: [GetNutrientsBalance]
};
</script>

<style></style>
