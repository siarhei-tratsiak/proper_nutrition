<template>
  <div class="d-flex justify-space-around">
    <v-icon @click="editItem(item)">mdi-pencil</v-icon>
    <v-icon @click="deleteItem(item)">mdi-delete</v-icon>
  </div>
</template>

<script>
import { mapActions, mapMutations, mapState } from 'vuex'

export default {
  computed: {
    ...mapState(['selectedDate'])
  },

  methods: {
    ...mapActions(['deleteRation', 'setRation']),

    ...mapMutations(['setStateObject']),

    editItem: function (item) {
      const editedProduct = { objectName: 'editedProduct', state: item }
      this.setStateObject(editedProduct)
      const status = {
        objectName: 'status',
        state: { productDialogIsOpened: true }
      }
      this.setStateObject(status)
    },

    deleteItem: function (item) {
      this.deleteRation(item.id)
      this.setRation(this.selectedDate)
    }
  },

  props: ['item']
}
</script>
