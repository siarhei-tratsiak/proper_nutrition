<template>
  <div :class="color" id="background" class="d-flex flex-column align-center">
    <RunButton />

    <SelectPeriod />
  </div>
</template>

<script>
import RunButton from "@/components/home/RunButton.vue";
import SelectPeriod from "@/components/home/SelectPeriod.vue";

export default {
  name: "Home",

  components: {
    RunButton,
    SelectPeriod
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
