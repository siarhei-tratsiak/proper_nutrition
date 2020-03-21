<template>
  <v-app id="app">
    <v-navigation-drawer app>
      <Settings />
    </v-navigation-drawer>

    <v-content>
      <Content />
      <RunButton />
      <Snackbar />
    </v-content>

    <v-navigation-drawer app right>menu</v-navigation-drawer>
  </v-app>
</template>

<script>
import Content from '@/components/content/Content.vue';
import RunButton from '@/components/RunButton.vue';
import Settings from '@/components/settings/Settings.vue';
import Snackbar from '@/components/Snackbar.vue';

import {mapActions} from 'vuex';

export default {
  components: {
    Content,
    RunButton,
    Settings,
    Snackbar,
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
