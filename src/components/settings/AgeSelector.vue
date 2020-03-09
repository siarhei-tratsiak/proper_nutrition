<template lang="html">
    <v-text-field filled
      @change="settingChange"
      label="Возраст: "
      :rules="rules"
      :suffix="suffix"
      :value="settings.age"
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
      (value) => Number.isInteger(+value) || 'Не целое',
    ],
  }),
  computed: {
    ...mapState(['settings']),
    suffix: function() {
      const age = this.settings.age;
      const lastDigit = age - Math.floor(age / 10) * 10;
      const lastTwoDigits = age - Math.floor(age / 100) * 100;
      if (lastDigit === 1 && lastTwoDigits !== 11) {
        return 'год';
      } else if ([1, 2, 3, 4].includes(lastDigit) &&
        ![11, 12, 13, 14].includes(lastTwoDigits)) {
        return 'года';
      } else {
        return 'лет';
      }
    },
  },
  methods: {
    settingChange: function(value) {
      this.$store.dispatch('settingChange', {setting: 'age', value: value});
    },
  },
};
</script>

<style lang="css" scoped>
</style>
