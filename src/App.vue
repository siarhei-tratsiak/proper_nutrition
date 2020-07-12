<template>
  <v-app>
    <Navigation></Navigation>
    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
import GetDates from "@/mixins/GetDates";
import Navigation from "@/components/navigation/Navigation.vue";
import { mapActions, mapMutations } from "vuex";

export default {
  components: {
    Navigation
  },

  created: function() {
    this.initData();
    const dates = this.getDates();
    const start = dates.today;
    const end = dates.end;
    this.setPeriod({ start, end });
  },

  methods: {
    ...mapActions(["initData"]),
    ...mapMutations(["setPeriod"])
  },

  mixins: [GetDates],

  name: "App"
};
</script>
