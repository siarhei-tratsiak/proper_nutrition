<template lang="html">
  <v-layout align-center fill-height justify-space-between>
    <v-flex>{{ $t('settings.sex.title') }}</v-flex>

    <v-spacer />

    <v-radio-group @change="switchSex" row :value="settings.sex">
      <v-radio :label="$t('settings.sex.male')" value="male"></v-radio>

      <v-radio :label="$t('settings.sex.female')" value="female"></v-radio>
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
      const payload = { nutrientIDs: [1008, 1004, 1003, 1092, 1095, 1098, 1106, 1162, 1165, 1175, 1180, 1185, 1089, 1090] } // sex-specific nutrients
      this.setConstraints(payload)
    }
  }
}
</script>
