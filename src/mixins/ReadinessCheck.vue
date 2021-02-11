<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState(['settings']),

    isReady: function () {
      return !!this.settings.userID
    }
  }
}
</script>
