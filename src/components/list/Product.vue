<template lang="html">
  <v-list-item class="product-list-item">
    <v-list-item-action>
      <v-checkbox
        :input-value="isProductSelected"
        readonly
        @click.stop="updateCheckbox"
      >
      </v-checkbox>
    </v-list-item-action>

    <v-list-item-content>
      <v-list-item-title class="product-title" v-text="product.name">
      </v-list-item-title>
    </v-list-item-content>
  </v-list-item>
</template>

<script>
import { mapActions /* , mapState */ } from 'vuex'

export default {
  props: ['product', 'isProductSelected'],

  computed: {
    /* ...mapState(['favored', 'selected']),

    enabled() {
      const product = this.selected
          .find((product) => product.id === this.product.id);
      const enabled = !!product.selected;
      return enabled;
    },

    isFavored() {
      return this.favored.includes(this.product.id);
    }, */
  },

  methods: {
    ...mapActions(['toggleSelected']),

    /* updateFavored() {
      const payload = {id: this.product.id, favored: +!this.isFavored};
      this.isFavored = !this.isFavored;
      this.toggleFavored(payload);
    }, */

    updateCheckbox () {
      const payload = {
        id: this.product.id,
        selected: +!this.isProductSelected
      }
      this.toggleSelected(payload)
    }
  }
}
</script>

<style lang="css" scoped>
.product-list-item {
  padding-left: 30px;
}

.product-title {
  width: 0;
}
</style>
