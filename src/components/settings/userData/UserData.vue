<template>
  <v-card class="ma-1">
    <v-card-title>
      {{ $t('settings.title') }}
    </v-card-title>

    <v-card-text>
      <v-card-subtitle>
        {{ $t('settings.user') }}
      </v-card-subtitle>

      <SexSelector />

      <AgeSelector />

      <WeightSelector />

      <HeightSelector />

      <ActivitySelector />

      <GoalSelector />

      <v-card-subtitle>
        {{ $t('settings.application') }}
      </v-card-subtitle>

      <LanguageSelector />
    </v-card-text>
  </v-card>
</template>

<script>
import ActivitySelector from '@/components/settings/userData/ActivitySelector'
import AgeSelector from '@/components/settings/userData/AgeSelector'
import GoalSelector from '@/components/settings/userData/GoalSelector'
import HeightSelector from '@/components/settings/userData/HeightSelector'
import LanguageSelector from '@/components/settings/userData/LanguageSelector'
import SexSelector from '@/components/settings/userData/SexSelector'
import WeightSelector from '@/components/settings/userData/WeightSelector'

export default {
  components: {
    ActivitySelector,
    AgeSelector,
    GoalSelector,
    HeightSelector,
    LanguageSelector,
    SexSelector,
    WeightSelector
  }
}
</script>
