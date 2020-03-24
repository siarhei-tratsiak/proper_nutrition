<template>
    <v-data-table
        dense
        :headers="headers"
        hide-default-footer
        :items="ration">

        <template v-slot:top>
            <TableTop />
        </template>

        <template v-slot:item.actions="{ item }">

        <v-icon
            small
            class="mr-2"
            @click="editItem(item)"
        >
            create
        </v-icon>

        <v-icon
            small
            @click="deleteItem(item)"
        >
            delete
        </v-icon>

        </template>
    </v-data-table>
</template>

<script>
import TableTop from '@/components/ration/TableTop';
import {mapState} from 'vuex';

export default {

  components: {
    TableTop,
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
    ...mapState(['ration']),
  },
};
</script>
