<template lang="html">
  <ul id="nutrients-list">
    <li v-for="nutrient in nutrients" v-bind:key="nutrient.id">
      {{ nutrient.name }}: {{ nutrient.constraint }}
      {{ nutrient.constant }}, {{ nutrient.count }}
    </li>
  </ul>
</template>

<script>
import {mapState} from 'vuex';

export default {
  computed: {
    ...mapState(['nutrients']),
  },
};
</script>

<style lang="css" scoped>
li {
  text-align: left;
}
</style>
