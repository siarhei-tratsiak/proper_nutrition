<template>
  <v-app>
    <Navigation />
    <v-content>
      <router-view />
    </v-content>
  </v-app>
</template>

<script>
import { mapActions } from 'vuex'

import Navigation from '@/components/navigation/Navigation'
import IndexLocalization from '@/mixins/IndexLocalization'

export default {
  components: {
    Navigation
  },

  computed: {
    language: function () {
      return this.$i18n.locale
    }
  },

  created: function () {
    this.initData()
  },

  methods: {
    ...mapActions(['initData'])
  },

  mixins: [IndexLocalization],

  name: 'App',

  watch: {
    language: function (language) {
      this.localize(language)
    }
  }
}
</script>

<style>
  .v-data-table__mobile-row__cell {
    margin: 0;
  }
</style>
