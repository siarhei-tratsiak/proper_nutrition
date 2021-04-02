<template>
  <v-card class="ma-2">
    <v-card-title>Настройки</v-card-title>

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
import ActivitySelector from '@/components/settings/userData/ActivitySelector'
import AgeSelector from '@/components/settings/userData/AgeSelector'
import GoalSelector from '@/components/settings/userData/GoalSelector'
import HeightSelector from '@/components/settings/userData/HeightSelector'
import SexSelector from '@/components/settings/userData/SexSelector'
import WeightSelector from '@/components/settings/userData/WeightSelector'

export default {
  components: {
    ActivitySelector,
    AgeSelector,
    GoalSelector,
    HeightSelector,
    SexSelector,
    WeightSelector
  }
}
</script>
