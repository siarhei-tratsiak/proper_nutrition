<template lang="html">
  <v-layout align-center justify-space-between fill-height>
    <v-flex>Пол: </v-flex>
    <v-radio-group
      :value="settings.sex"
      row
      @change="settingChange"
      :disabled="settings.disabled"
    >
      <v-radio label="М" value="male"></v-radio>
      <v-radio label="Ж" value="female"></v-radio>
    </v-radio-group>
  </v-layout>

</template>

<script>
import {mapState} from 'vuex';

export default {
  computed: {
    ...mapState(['settings']),
  },
  methods: {
    settingChange: function(value) {
      this.$store.dispatch('settingChange', {setting: 'sex', value: value});
    },
  },
};
</script>

<style lang="css" scoped>
</style>
