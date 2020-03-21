<template lang="html">
  <v-list-group>

    <template v-slot:activator>

        <v-list-item-action @click.stop="updateCheckbox">
          <v-checkbox
            indeterminate
            readonly
            v-show="indeterminate && !isCategorySelected"
          >
          </v-checkbox>
          <v-checkbox
            :input-value="isCategorySelected"
            readonly
            v-show="!indeterminate"
          >
          </v-checkbox>
        </v-list-item-action>

        <v-list-item-content>
          <v-list-item-title v-text="categoryListItem.category.name">
          </v-list-item-title>
        </v-list-item-content>

    </template>

    <Product
      v-for="product in categoryListItem.products"
      :key="product.id"
      :product="product"
      :isProductSelected="isProductSelected(product.id)"
    />

  </v-list-group>
</template>

<script>
import Product from '@/components/content/products_list/Product';
import {mapActions} from 'vuex';

export default {

  components: {
    Product,
  },

  props: ['categoryListItem', 'selectedProducts'],

  computed: {

    indeterminate() {
      return this.selectedProducts.some(
          (product) =>
            product.selected !== this._isFirstProductSelected(),
      );
    },

    isCategorySelected() {
      return this.selectedProducts
          .every((product) => !!product.selected);
    },

  },

  methods: {

    ...mapActions(['toggleSelected']),

    _isFirstProductSelected() {
      return this.selectedProducts[0].selected;
    },

    isProductSelected(productID) {
      const selectedProduct = this.selectedProducts
          .find((product) => product.id === productID);
      return !!selectedProduct.selected;
    },

    updateCheckbox() {
      const payload = {
        category_id: this.categoryListItem.category.id,
        selected: +!this.isCategorySelected,
      };
      this.toggleSelected(payload);
    },

    /* _getClickedItemCSSid(DOMElem) {
      return DOMElem.id;
    },

    _getDOMElem(eventTarget) {
      return eventTarget.closest('.product-selected') ||
        eventTarget.closest('.product-favored');
    },

    _getPayload(DOMElem) {
      const productId = this._getProductId(DOMElem);
      console.log(productId);
      const isProductSelected = this.selected
          .find(({id}) => id === productId)
          .selected;
      const payload = {id: productId, selected: !isProductSelected};
      return payload;
    },

    _getProductId(DOMElem) {
      const cssId = this._getClickedItemCSSid(DOMElem);
      return +cssId.match(/\d+/g)[0];
    },

    _setEnabled(selectedCategory) {
      const everyProductIsSelected = selectedCategory
          .every((curVal) => curVal.selected);
      this.enabled = everyProductIsSelected;
    },

    _setSelectedProduct(DOMElem) {
      this. _switchCheckbox(DOMElem);
      const payload = this._getPayload(DOMElem);
      this.toggleSelected(payload);
    },

    _switchCheckbox(DOMElem) {
      const iconsList = DOMElem.firstElementChild.children;
      for (const node of iconsList) {
        node.style.display = node.style.display === 'none' ? '' : 'none';
      }
    },

    checkForCheckbox(event) {
      if (!event.target.closest('.products-category')) {
        this.expanded = !this.expanded;
      }
    },

    listGroupClick(event) {
      const DOMElem = this._getDOMElem(event.target);
      this._setSelectedProduct(DOMElem);
    },*/

  },

};
</script>

<style lang="css">
</style>
