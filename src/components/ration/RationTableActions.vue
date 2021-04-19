<template>
  <div class="d-flex justify-space-around">
    <v-icon @click="editItem(item)">{{ mdiPencil }}</v-icon>
    <v-icon @click="deleteItem(item)">{{ mdiDelete }}</v-icon>
  </div>
</template>

<script>
import { mapActions, mapMutations, mapState } from 'vuex'
import { mdiPencil, mdiDelete } from '@mdi/js'

export default {
  computed: {
    ...mapState(['selectedDate'])
  },

  data: () => ({
    mdiDelete,
    mdiPencil
  }),

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
