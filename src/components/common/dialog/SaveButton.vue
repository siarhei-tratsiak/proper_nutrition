<template>
  <v-btn @click="save" :disabled="!valid">
    <v-icon>{{ mdiContentSave }}</v-icon>
  </v-btn>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import CloseProductDialog from '@/mixins/CloseProductDialog'
import { mdiContentSave } from '@mdi/js'
import { dates } from '@/api/dates'

export default {
  computed: {
    ...mapState(['editedProduct', 'selectedDate', 'settings'])
  },

  data: () => ({
    mdiContentSave
  }),

  methods: {
    ...mapActions(['editRation', 'setRation', 'setRationForPeriod']),

    save: function () {
      const ration = {
        product_id: this.editedProduct.product_id,
        user_id: this.settings.userID,
        date: this.selectedDate,
        mass: +this.editedProduct.mass
      }
      const isEdit = typeof this.editedProduct.id === 'number'
      if (isEdit) {
        ration.id = this.editedProduct.id
      }
      this.editRation(ration)
      this.close()
      const isProduct = this.$route.name === 'Product'
      const date = isProduct ? dates.getToday() : this.selectedDate
      this.setRation(date)
      this.setRationForPeriod()
    }
  },

  mixins: [CloseProductDialog],

  props: ['valid']
}
</script>

<style></style>
