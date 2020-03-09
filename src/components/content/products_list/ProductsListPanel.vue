<template lang="html">
    <v-expansion-panel>

      <v-expansion-panel-header>
        <v-checkbox
          class="header-checkbox"
          :disabled="disabled"
          :indeterminate="indeterminate"
          @click.stop="updateCheckbox"
          v-model="enabled">
        </v-checkbox>
        <h3>СПИСОК ПРОДУКТОВ</h3>
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
      </v-expansion-panel-header>


      <v-expansion-panel-content>
        <ProductsList />
      </v-expansion-panel-content>

    </v-expansion-panel>
</template>

<script>
import ProductsList from '@/components/content/products_list/ProductsList';
import {mapActions, mapState} from 'vuex';

export default {

  components: {
    ProductsList,
  },

  data: () => ({
    enabled: false,
  }),

  computed: {

    ...mapState(['isFilterOn', 'selected', 'status']),

    disabled() {
      return !this.status.selected;
    },

    indeterminate() {
      const ProductsAreInDifferentStates = this.selected.some(
          (curVal, index, array) => curVal.selected !== array[0].selected,
      );
      const indeterminate =
        this.disabled ? false : ProductsAreInDifferentStates;
      if (!indeterminate) {
        this._setEnabled();
      }
      return indeterminate;
    },
  },

  methods: {

    ...mapActions(['toggleSelected', 'toggleFilter']),

    _setEnabled() {
      const everyProductIsSelected = this.selected.every(
          (curVal) => curVal.selected,
      );
      const enabled = this.disabled ? false : everyProductIsSelected;
      this.enabled = enabled;
    },

    updateCheckbox() {
      const enabled = this.indeterminate ? true : !this.enabled;
      const payload = {all: true, selected: +enabled};
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
