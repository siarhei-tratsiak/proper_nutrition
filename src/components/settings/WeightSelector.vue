<template lang="html">
    <v-text-field filled
      @change="settingChange"
      label="Вес: "
      :rules="rules"
      suffix="кг"
      :value="settings.weight"
      :disabled="settings.disabled"
    >
    </v-text-field>
</template>

<script>
import {mapState} from 'vuex';

export default {
  data: () => ({
    rules: [
      (value) => !!value || 'Обязательное поле',
      (value) => (!isNaN(parseFloat(+value)) && isFinite(+value)) || 'Не число',
      (value) => +value > 0 || 'Не больше нуля',
    ],
  }),
  computed: {
    ...mapState(['settings']),
  },
  methods: {
    settingChange: function(value) {
      this.$store.dispatch('settingChange', {setting: 'weight', value: value});
    },
  },
};
</script>

<style lang="css" scoped>
</style>
