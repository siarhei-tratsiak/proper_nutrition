<template>
  <v-toolbar>
    <v-toolbar-title>Рацион: {{ date }}</v-toolbar-title>
    <v-spacer></v-spacer>
    <AddProductButton />
  </v-toolbar>
</template>

<script>
import AddProductButton from '@/components/ration/AddProductButton'
import { mapState } from 'vuex'

export default {
  components: {
    AddProductButton
  },

  computed: {
    ...mapState(['selectedDate']),

    date: function () {
      const options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }
      return new Date(this.selectedDate).toLocaleDateString(undefined, options)
    }
  }
}
</script>
