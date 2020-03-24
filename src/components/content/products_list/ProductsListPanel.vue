<template lang="html">
  <v-card
    v-if="selected.length > 0"
    width="100%">

    <v-toolbar>

      <div @click.stop="updateCheckbox">
        <v-checkbox
          hide-details
          indeterminate
          readonly
          v-show="indeterminate && !isAllSelected"
        >
        </v-checkbox>
        <v-checkbox
          hide-details
          :input-value="isAllSelected"
          readonly
          v-show="!indeterminate"
        >
        </v-checkbox>
      </div>

      <v-toolbar-title>СПИСОК ПРОДУКТОВ</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn
          icon
          x-small
          right
          @click.stop="updateFavoredFilter"
          id="filter-button"
        >
          <v-icon color="yellow accent-2" v-if="isFilterOn">star</v-icon>
          <v-icon v-else>star_border</v-icon>
      </v-btn>

    </v-toolbar>

    <ProductsList />

  </v-card>
</template>

<script>
import ProductsList from '@/components/content/products_list/ProductsList';
import {mapActions, mapState} from 'vuex';

export default {

  components: {
    ProductsList,
  },

  computed: {

    ...mapState(['isFilterOn', 'selected', 'status']),

    disabled() {
      return !this.status.selected;
    },

    indeterminate() {
      return this.selected.some(
          (product) =>
            product.selected !== this._isFirstProductSelected(),
      );
    },

    isAllSelected() {
      return this.selected
          .every((product) => !!product.selected);
    },
  },

  methods: {

    ...mapActions(['toggleSelected', 'toggleFilter']),

    _isFirstProductSelected() {
      return this.selected[0].selected;
    },

    _setEnabled() {
      const everyProductIsSelected = this.selected.every(
          (curVal) => curVal.selected,
      );
      const isAllSelected = this.disabled ? false : everyProductIsSelected;
      this.isAllSelected = isAllSelected;
    },

    updateCheckbox() {
      const isAllSelected = this.indeterminate ? true : !this.isAllSelected;
      const payload = {all: true, selected: +isAllSelected};
      this.toggleSelected(payload);
    },

    updateFavoredFilter() {
      this.toggleFilter();
    },

  },

};
</script>

<style lang="css">
 #filter-button {
   flex-grow: 0
 }
</style>
