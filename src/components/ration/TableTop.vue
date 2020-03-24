<template>
    <v-toolbar>
        <v-toolbar-title>РАЦИОН {{ selectedDate }}</v-toolbar-title>
         <v-spacer></v-spacer>
    </v-toolbar>
</template>

<script>
import {mapState} from 'vuex';

export default {
  computed: {
    ...mapState(['selectedDate']),
  },
};
</script>
