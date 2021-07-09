<template>
  <v-card class="ma-1" id="user-data_card">
    <v-card-title>
      {{ $t('settings.title') }}
    </v-card-title>

    <v-card-text class="align-stretch d-flex flex-column">
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

      <Alert />

      <BackUp />

      <Restore />
    </v-card-text>
  </v-card>
</template>

<script>
import ActivitySelector from '@/components/settings/userData/ActivitySelector'
import AgeSelector from '@/components/settings/userData/AgeSelector'
import Alert from '@/components/settings/userData/Alert'
import BackUp from '@/components/settings/userData/BackUp'
import GoalSelector from '@/components/settings/userData/GoalSelector'
import HeightSelector from '@/components/settings/userData/HeightSelector'
import LanguageSelector from '@/components/settings/userData/LanguageSelector'
import Restore from '@/components/settings/userData/Restore'
import SexSelector from '@/components/settings/userData/SexSelector'
import WeightSelector from '@/components/settings/userData/WeightSelector'

export default {
  components: {
    ActivitySelector,
    AgeSelector,
    Alert,
    BackUp,
    GoalSelector,
    HeightSelector,
    LanguageSelector,
    Restore,
    SexSelector,
    WeightSelector
  }
}
</script>

<style>
  #user-data_card {
    max-width: 400px;
  }
</style>
