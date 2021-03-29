<template>
  <v-btn @click='restoreDefaults'>по умолчанию</v-btn>
</template>

<script>
import { mapActions } from 'vuex'
import { selected } from '@/data/selected'

export default {
  methods: {
    ...mapActions(['toggleSelected']),

    restoreDefaults: function () {
      const payload = selected.map(productID => ({ id: productID }))
      this.toggleSelected(payload)
    }
  }
}
</script>
