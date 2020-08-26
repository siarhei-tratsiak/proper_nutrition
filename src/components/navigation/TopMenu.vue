<template>
  <v-app-bar app color="primary" hide-on-scroll>
    <NavigationList />
  </v-app-bar>
</template>

<script>
import NavigationList from '@/components/navigation/NavigationList.vue'

export default {
  components: {
    NavigationList
  }
}
</script>
