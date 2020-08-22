<script>
import { mapMutations } from 'vuex'

export default {
  methods: {
    ...mapMutations(['setEditedProduct', 'setStatus']),

    close () {
      this.setEditedProduct()
      this.setStatus({ productDialogIsOpened: false })
    }
  }
}
</script>
