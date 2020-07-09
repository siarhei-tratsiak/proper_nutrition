<template lang="html">
  <v-list>
    <Category
      v-for="categoryListItem in favoredProductsList"
      :key="categoryID(categoryListItem)"
      :categoryListItem="categoryListItem"
      :selectedProducts="selectedProducts(categoryListItem)"
    />
  </v-list>
</template>

<script>
import Category from "@/components/list/Category";
import { mapState } from "vuex";

export default {
  components: {
    Category
  },

  computed: {
    ...mapState(["favored", "isFilterOn", "productsList", "selected"]),

    favoredProductsList() {
      if (this.isFilterOn) {
        const favoredProductsList = this.productsList.filter(categoryListItem =>
          categoryListItem.products.filter(product => product.favored === 1)
        );
        return favoredProductsList;
      }
      return this.productsList;
    }
  },

  methods: {
    categoryID(categoryListItem) {
      return categoryListItem.category.id;
    },

    selectedProducts(categoryListItem) {
      return this.selected.filter(
        product => product.category_id === this.categoryID(categoryListItem)
      );
    }

    /* _classCheck(DOMElem) {
      const classList = DOMElem.classList;
      if (classList.contains('products-category')) {
        this._switchCategorySelected(DOMElem);
      }
    },

    _displayIcon(iconsList, node) {
      const cbob = 'check_box_outline_blank';
      const iconName = node.innerHTML==='check_box' ? cbob : 'check_box';
      for (const node of iconsList) {
        if (node.innerHTML===iconName) {
          node.style.display='';
        }
      }
    },

    _getDOMElem(eventTarget) {
      return eventTarget.closest('.product-selected') ||
        eventTarget.closest('.product-favored') ||
        eventTarget.closest('.products-category');
    },

    _getCategoryId(DOMElem) {
      return DOMElem.id.match(/\d+/g)[0];
    },

    _isCategorySelected(DOMElem) {
      const iconsList = DOMElem.children;
      let selected = false;
      for (const node of iconsList) {
        if (node.style.display==='') {
          selected = node.innerHTML==='check_box';
          break;
        }
      }
      return selected;
    },

    _switchCategorySelected(DOMElem) {
      this._switchIcon(DOMElem);
      this._toggleDBSelected(DOMElem);
    },

    _switchCheckbox(DOMElem) {
      const iconsList = DOMElem.firstElementChild.children;
      for (const node of iconsList) {
        node.style.display = node.style.display === 'none' ? '' : 'none';
      }
    },

    _switchIcon(DOMElem) {
      const iconsList = DOMElem.children;
      for (const node of iconsList) {
        if (node.style.display==='') {
          node.style.display='none';
          this._displayIcon(iconsList, node);
          break;
        }
      }
    },

    _toggleDBSelected(DOMElem) {
      const selected = this._isCategorySelected(DOMElem);
      const categoryID = this._getCategoryId(DOMElem);
      const payload = {category_id: categoryID, selected: selected};
      this.toggleSelected(payload);
    },

    listClick(event) {
      const DOMElem = this._getDOMElem(event.target);
      if (DOMElem) {
        this._classCheck(DOMElem);
      }
      // this._setSelectedProduct(DOMElem);
    },*/
  }
};
</script>

<style lang="css" scoped></style>
