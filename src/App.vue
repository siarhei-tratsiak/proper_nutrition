<template>
  <v-app id="app">
    <v-navigation-drawer app>
      <Settings />
    </v-navigation-drawer>

    <v-content>
      <Content />
      <RunButton />
    </v-content>

    <v-navigation-drawer app right>menu</v-navigation-drawer>
  </v-app>
</template>

<script>
import Settings from '@/components/settings/Settings.vue';
import Content from '@/components/content/Content.vue';
import RunButton from '@/components/RunButton.vue';
import {mapActions} from 'vuex';

export default {
  components: {
    Settings,
    Content,
    RunButton,
  },
  created: async function() {
    this.initData();
  },
  methods: {
    ...mapActions(['initData']),
  },
};
</script>

<style lang="scss">
</style>
