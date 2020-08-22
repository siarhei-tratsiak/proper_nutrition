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
import { mapActions, mapState } from 'vuex'

export default {
  computed: {
    ...mapState(['settings'])
  },

  methods: {
    ...mapActions(['setConstraints', 'setSettings']),

    switchSex: function (sex) {
      this.setSettings({ sex })
      const payload = {
        nutrientIDs: [
          1008,
          1004,
          1003,
          1092,
          1095,
          1098,
          1106,
          1162,
          1165,
          1175,
          1180,
          1185,
          1089,
          1090
        ]
      }
      this.setConstraints(payload)
    }
  }
}
</script>

<style lang="css" scoped></style>
