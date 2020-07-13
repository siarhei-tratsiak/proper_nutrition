<template>
  <v-card class="mx-auto" max-width="500">
    <v-card-title>
      <h2>НАСТРОЙКИ</h2>
    </v-card-title>
    <v-card-text>
      <SexSelector />
      <AgeSelector />
      <WeightSelector />
      <HeightSelector />
      <ActivitySelector />
      <GoalSelector />
    </v-card-text>
  </v-card>
</template>

<script>
import ActivitySelector from "@/components/settings/ActivitySelector";
import AgeSelector from "@/components/settings/AgeSelector";
import GoalSelector from "@/components/settings/GoalSelector";
import HeightSelector from "@/components/settings/HeightSelector";
import SexSelector from "@/components/settings/SexSelector";
import WeightSelector from "@/components/settings/WeightSelector";

export default {
  components: {
    ActivitySelector,
    AgeSelector,
    GoalSelector,
    HeightSelector,
    SexSelector,
    WeightSelector
  }
};
</script>
