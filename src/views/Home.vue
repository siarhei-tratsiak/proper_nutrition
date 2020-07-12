<template>
  <div :class="color" id="background" class="d-flex flex-column align-center">
    <div class="flex-grow-1 d-flex justify-center align-center">
      <RunButton v-if="ready" />
    </div>
    <SelectPeriod />
  </div>
</template>

<script>
import { mapState } from "vuex";
import RunButton from "@/components/home/RunButton.vue";
import SelectPeriod from "@/components/home/SelectPeriod.vue";

export default {
  name: "Home",

  components: {
    RunButton,
    SelectPeriod
  },

  computed: {
    ...mapState(["settings"]),

    ready: function() {
      return !!this.settings.userID;
    }
  },

  data: () => ({
    color: "green accent-2"
  })
};
</script>

<style scoped>
#background {
  height: 100%;
}
</style>
