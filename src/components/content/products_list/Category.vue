<template lang="html">

  <v-list-group>

    <template v-slot:activator>

      <v-list-item-action>
        <!--<v-checkbox
          class="header-checkbox"
          v-model="enabled"
          :indeterminate="indeterminate"
          @click.stop="updateCheckbox"
          >
        </v-checkbox>-->
        <!--<v-checkbox
          class="header-checkbox"
          v-model="enabled"
          :indeterminate="indeterminate"
          >
        </v-checkbox>-->
        <v-icon v-show="!enabled">check_box</v-icon>
        <v-icon v-show="enabled">check_box_outline_blank</v-icon>
      </v-list-item-action>

      <v-list-item-content>
        <v-list-item-title>
          {{ categoryListItem.category.name }}
        </v-list-item-title>
      </v-list-item-content>

    </template>

    <div @click="listGroupClick">
      <Product
        v-for="product in categoryListItem.products"
        :key="product.id"
        :product="product"
        :favored="favored"
        :selected="selected"
        :status="status"
      />
    </div>

  </v-list-group>
</template>

<script>
import Product from '@/components/content/products_list/Product';
import {mapActions, mapState} from 'vuex';

export default {

  components: {
    Product,
  },

  data: () => ({
    enabled: false,
  }),

  props: ['categoryListItem'],

  computed: {

    ...mapState(['favored', 'selected', 'status']),

    categoryId() {
      return this.categoryListItem.category.id;
    },

    indeterminate() {
      const selectedCategory = this.selected
          .filter((curVal) => curVal.category_id === this.categoryId);
      const productsAreInDifferentStates = selectedCategory.some(
          (curVal, index, array) => curVal.selected !== array[0].selected,
      );
      if (!productsAreInDifferentStates) {
        this._setEnabled(selectedCategory);
      }
      const indeterminate = productsAreInDifferentStates;
      return indeterminate;
    },

  },

  methods: {

    ...mapActions(['toggleSelected']),

    _setEnabled(selectedCategory) {
      const everyProductIsSelected = selectedCategory
          .every((curVal) => curVal.selected);
      this.enabled = everyProductIsSelected;
    },

    /* panelClick: function(event) {
      if (event) {
        alert(event.target.tagName);
      }
    },*/

    listGroupClick(event) {
      const clickedElem = event.target.closest('.product-selected') ||
        event.target.closest('.product-favored');
      const id = clickedElem.id;
      console.log(id);
    },

    updateCheckbox() {
      const enabled = this.indeterminate ? 1 : +!this.enabled;
      const payload = {category_id: this.categoryId, selected: enabled};
      this.toggleSelected(payload);
    },

  },

};
</script>

<style lang="css">
</style>
