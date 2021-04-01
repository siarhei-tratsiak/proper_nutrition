<script>
import { mapMutations } from 'vuex'

export default {
  methods: {
    ...mapMutations(['clearEditedProduct', 'setStateObject']),

    close: function () {
      this.clearEditedProduct()
      const status = {
        objectName: 'status',
        state: { productDialogIsOpened: false }
      }
      this.setStateObject(status)
    }
  }
}
</script>
