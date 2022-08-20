<template>
  <component :is="component">
    <NavigationList />
  </component>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { mapState } from 'vuex'

import NavigationList from '@/components/navigation/NavigationList.vue'

export default defineComponent({
  components: {
    NavigationList
  },

  data () {
    return {
      component: this.isVertical ? 'v-app-bar' : 'v-navigation-drawer'
    }
  },

  computed: {
    ...mapState('status', ['isVertical'])
  }
})
</script>
