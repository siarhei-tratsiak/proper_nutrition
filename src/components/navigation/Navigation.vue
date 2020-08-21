<template>
  <div>
    <v-navigation-drawer
      app
      permanent
      :mini-variant="miniVariant"
      color="primary"
      v-if="isHorizontal"
    >
      <NavigationList :isHorizontal="isHorizontal"></NavigationList>
    </v-navigation-drawer>

    <v-app-bar app color="primary" hide-on-scroll v-else>
      <NavigationList :isHorizontal="isHorizontal"></NavigationList>
    </v-app-bar>
  </div>
</template>

<script>
import debounce from "lodash";
import NavigationList from "@/components/navigation/NavigationList.vue";
import { mapMutations, mapState } from "vuex";

export default {
  beforeDestroy: function() {
    window.removeEventListener("resize", debounce(this.onResize, this.delayMS));
  },

  computed: {
    ...mapState(["isHorizontal"])
  },

  data: function() {
    return {
      delayMS: 300,
      menuItems: [
        { path: "Home", icon: "mdi-home", title: "На главную" },
        { path: "Result", icon: "mdi-hamburger", title: "Результат" }
      ],
      miniVariant: false,
      viewportBreakpoint: 960
    };
  },

  methods: {
    ...mapMutations(["setHorizontal"]),

    onResize() {
      const windowInnerWidth = window.innerWidth;
      this.miniVariant = windowInnerWidth < this.viewportBreakpoint;
      this.setHorizontal(windowInnerWidth > window.innerHeight);
    }
  },

  mounted: function() {
    this.onResize();
    window.addEventListener("resize", debounce(this.onResize, this.delayMS));
  },

  components: {
    NavigationList
  }
};
</script>

<style></style>
