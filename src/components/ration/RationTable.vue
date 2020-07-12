<template>
  <v-data-table class="ration-table" :headers="headers" hide-default-footer :items="ration">
    <template v-slot:top>
      <TableTop />
    </template>

    <template v-slot:item.product_name="{ item }">
      <router-link :to="{ name: 'Product', params: { id: item.product_id } }">
        {{
        item.product_name
        }}
      </router-link>
    </template>

    <template v-slot:item.actions="{ item }">
      <v-icon @click="editItem(item)">mdi-pencil</v-icon>
      <v-icon @click="deleteItem(item)">mdi-delete</v-icon>
    </template>
  </v-data-table>
</template>

<script>
import TableTop from "@/components/ration/TableTop";
import { mapActions, mapMutations, mapState } from "vuex";

export default {
  components: {
    TableTop
  },

  created: function() {
    this.setRation(this.selectedDate);
  },

  data() {
    return {
      headers: [
        { text: "Продукт", value: "product_name" },
        { text: "Масса, г", value: "mass" },
        { text: "Действия", sortable: false, value: "actions" }
      ]
    };
  },

  computed: {
    ...mapState(["ration", "selectedDate"])
  },

  methods: {
    ...mapActions(["deleteRation", "setRation"]),
    ...mapMutations(["setEditedProduct", "setStatus"]),

    editItem(item) {
      this.setEditedProduct(item);
      const status = { productDialogIsOpened: true };
      this.setStatus(status);
    },

    deleteItem(item) {
      const id = item.id;
      this.deleteRation(id);
      this.setRation(this.selectedDate);
    }
  }
};
</script>

<style>
.ration-table th:first-of-type {
  width: 100%;
}
</style>
