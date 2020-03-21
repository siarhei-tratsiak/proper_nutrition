<template lang="html">
    <div>
        <v-snackbar
            :value="saving"
        >
            Saving data. Don't close the page.
        </v-snackbar>
    </div>

</template>

<script>
import {mapState} from 'vuex';

export default {

  computed: {

    ...mapState(['status']),

    saving() {
      return this.status.recordingToDB;
    },

  },

};
</script>
