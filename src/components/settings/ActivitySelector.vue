<template lang="html">
  <v-layout align-center justify-space-between fill-height>
    <v-select
      filled
      @change="settingChange"
      :items="items"
      label="Активность:"
      :value="settings.activity"
      :disabled="settings.disabled"
    >
    </v-select>
    <v-tooltip top>
      <template v-slot:activator="{ on }">
        <v-icon right v-on="on">help</v-icon>
      </template>
      <p>
        <strong>очень низкая</strong> - сидячая работа, не требующая
        значительных физических нагрузок;
      </p>
      <p>
        <strong>низкая</strong> - интенсивные упражнения не менее 20 минут
        один-три раза в неделю (езда на велосипеде, бег трусцой,
        баскетбол, плавание, катание на коньках и т.д. или занятый стиль жизни,
        который требует частой ходьбы в течение длительного времени);
      </p>
      <p>
        <strong>средняя</strong> - интенсивная тренировка не менее 30-60 мин
        три-четыре раза в неделю (любой из перечисленных выше видов спорта);
      </p>
      <p>
        <strong>высокая</strong> - интенсивные упражнения и занятия спортом 5-7
        дней в неделю или трудоемкие занятия: строительные работы (кирпичная
        кладка, столярное дело и т.д.), занятость в сельском хозяйстве и т.п.;
      </p>
      <p>
        <strong>очень высокая</strong> - чрезвычайно активные и/или очень
        энергозатратные виды деятельности: занятия спортом с почти ежедневным
        графиком и несколькими тренировками в течение дня; очень трудоемкая
        работа, например, сгребание угля или длительный рабочий день на
        сборочной линии.
      </p>
    </v-tooltip>
  </v-layout>
</template>

<script>
import {mapState} from 'vuex';

export default {
  data: () => ({
    items: ['очень низкая', 'низкая', 'средняя', 'высокая', 'очень высокая'],
  }),
  computed: {
    ...mapState(['settings']),
  },
  methods: {
    settingChange: function(value) {
      this.$store.dispatch(
          'settingChange', {setting: 'activity', value: value},
      );
    },
  },
};
</script>

<style lang="css" scoped>
</style>
