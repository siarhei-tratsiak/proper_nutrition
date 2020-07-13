<template lang="html">
  <v-layout align-center justify-space-between fill-height>
    <v-flex>Пол:</v-flex>
    <v-spacer />
    <v-radio-group :value="settings.sex" row @change="switchSex">
      <v-radio label="Мужской" value="male"></v-radio>
      <v-radio label="Женский" value="female"></v-radio>
    </v-radio-group>
  </v-layout>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  computed: {
    ...mapState(["settings"])
  },

  methods: {
    ...mapActions(["setSettings"]),

    switchSex: function(sex) {
      this.setSettings({ sex });
    }
  }
};
</script>

<style lang="css" scoped></style>
