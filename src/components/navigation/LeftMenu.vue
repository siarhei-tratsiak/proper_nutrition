<template>
  <v-navigation-drawer
    app
    color="primary"
    :mini-variant="isMiniVariant"
    permanent
  >
    <NavigationList />
  </v-navigation-drawer>
</template>

<script>
import NavigationList from '@/components/navigation/NavigationList.vue'

export default {
  components: {
    NavigationList
  },

  props: ['isMiniVariant']
}
</script>
