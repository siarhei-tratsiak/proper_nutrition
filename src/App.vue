<template>
  <v-app>
    <Navigation></Navigation>
    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
import Navigation from "@/components/navigation/Navigation.vue";
import { mapActions } from "vuex";

export default {
  components: {
    Navigation
  },

  created: async function() {
    this.initData();
  },

  methods: {
    ...mapActions(["initData"])
  },

  name: "App"
};
</script>
