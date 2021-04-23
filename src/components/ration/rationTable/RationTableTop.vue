<template>
  <v-toolbar>
    <v-toolbar-title>
      {{ $t('rationTable.title', { date: formattedDate}) }}
    </v-toolbar-title>

    <v-spacer></v-spacer>

    <AddProductButton />
  </v-toolbar>
</template>

<script>
import AddProductButton from '@/components/common/AddProductButton'
import { mapState } from 'vuex'

export default {
  components: {
    AddProductButton
  },

  computed: {
    ...mapState(['selectedDate']),

    formattedDate: function () {
      const options = {
        day: 'numeric',
        month: 'long',
        weekday: 'long',
        year: 'numeric'
      }
      return new Date(this.selectedDate)
        .toLocaleDateString(this.$i18n.locale, options)
    }
  }
}
</script>
