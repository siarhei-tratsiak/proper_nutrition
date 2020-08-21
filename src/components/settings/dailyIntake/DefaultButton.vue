<template>
  <v-btn depressed class="ma-2" @click="setAllConstraints">по умолчанию</v-btn>
</template>

<script>
import { mapActions } from "vuex";

export default {
  methods: {
    ...mapActions(["setAllConstraints"])
  }
};
</script>

<style></style>
