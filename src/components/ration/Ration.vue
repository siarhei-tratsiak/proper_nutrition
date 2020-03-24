<template>
    <v-card v-if="settings.userId">
        <Calendar />
        <RationTable />
    </v-card>
</template>

<script>
import Calendar from '@/components/ration/Calendar';
import RationTable from '@/components/ration/RationTable';
import {mapState} from 'vuex';

export default {

  components: {
    Calendar,
    RationTable,
  },

  data() {
    return {
      headers: [
        {text: 'Продукт', value: 'product'},
        {text: 'Масса, г', value: 'mass'},
        {text: 'Действия', sortable: false, value: 'actions'},
      ],
    };
  },

  computed: {
    ...mapState(['settings']),
  },


};
</script>
