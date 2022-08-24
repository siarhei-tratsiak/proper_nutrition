<template>
  <v-app>
    <NavBar />

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import NavBar from '@/components/nav/NavBar.vue'

export default defineComponent({
  name: 'App',

  components: {
    NavBar
  },

  data () {
    return {
      //
    }
  }
})
</script>
