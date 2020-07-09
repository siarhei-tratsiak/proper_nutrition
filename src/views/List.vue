<template lang="html">
  <v-card>
    <v-card-title>
      Продукты
      <v-spacer></v-spacer>
      <v-text-field
        dense
        v-model="search"
        append-icon="mdi-magnify"
        label="Поиск"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>

    <v-data-table
      :headers="headers"
      item-key="id"
      :items="products"
      mobile-breakpoint="0"
      :search="search"
      show-select
      v-model="selected"
    >
      <template v-slot:item.name="{ item }">
        <router-link :to="{ name: 'Product', params: { id: item.id } }">{{
          item.name
        }}</router-link>
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
import { food as products } from "@/data/food.js";
import { mapActions, mapState } from "vuex";

export default {
  computed: {
    ...mapState({ stateSelected: "selected", status: "status" }),

    selected: {
      get: function() {
        return this.status.selected ? this._getSelected() : [];
      },

      set: function(payload) {
        return this.toggleSelected(payload);
      }
    }
  },

  data: () => ({
    headers: [{ text: "НАЗВАНИЕ", value: "name" }],
    products: products.map(product => ({ id: product[0], name: product[1] })),
    search: ""
  }),

  methods: {
    ...mapActions(["toggleSelected"]),

    _getSelected: function() {
      return this.stateSelected
        .filter(selectionItem => selectionItem.selected === 1)
        .map(selectionItem => ({
          id: selectionItem.id
          //name: products.find(product => product[0] === selectionItem.id)[1]
        }));
    }
  }
};
</script>

<style lang="css">
#filter-button {
  flex-grow: 0;
}
</style>
