<template lang="html">
    <v-form>
      <v-subheader>
        <v-icon left>settings</v-icon>
        <h2>НАСТРОЙКИ</h2>
      </v-subheader>
      <v-container>
        <SexSelector/>
        <AgeSelector/>
        <WeightSelector/>
        <HeightSelector/>
        <ActivitySelector/>
      </v-container>
    </v-form>
</template>

<script>
import SexSelector from '@/components/settings/SexSelector';
import AgeSelector from '@/components/settings/AgeSelector';
import WeightSelector from '@/components/settings/WeightSelector';
import HeightSelector from '@/components/settings/HeightSelector';
import ActivitySelector from '@/components/settings/ActivitySelector';

export default {
  components: {
    SexSelector,
    AgeSelector,
    WeightSelector,
    HeightSelector,
    ActivitySelector,
  },
};
</script>

<style lang="css" scoped>
</style>
