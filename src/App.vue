<template>
  <v-app>
    <Navigation></Navigation>
    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
import { getToday, getEnd } from "@/api/getDates.js";
import Navigation from "@/components/navigation/Navigation.vue";
import { mapActions, mapMutations } from "vuex";

export default {
  components: {
    Navigation
  },

  created: function() {
    this.initData();
    const start = getToday();
    const end = getEnd();
    this.setPeriod({ start, end });
  },

  methods: {
    ...mapActions(["initData"]),
    ...mapMutations(["setPeriod"])
  },

  name: "App"
};
</script>
