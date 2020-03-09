<template lang="html">
  <v-list-item>

    <v-list-item-action
      class="product-selected"
      :id="'product-selected-'+product.id"
    >
      <!--<v-checkbox
        @click.stop="updateCheckbox"
        v-model="enabled">
      </v-checkbox>-->
      <!--<v-btn
        icon
        small
        :id="'selected-checkbox-'+product.id"
      >
        <v-icon v-if="enabled">check_box</v-icon>
        <v-icon v-else>check_box_outline_blank</v-icon>
      </v-btn>-->
      <v-checkbox
        v-model="enabled">
      </v-checkbox>
    </v-list-item-action>

    <v-list-item-content>
      <v-list-item-title>
        <h5>{{ product.name }}</h5>
      </v-list-item-title>
    </v-list-item-content>

    <v-list-item-action>
      <!--<v-btn
        icon
        x-small
        @click.stop="updateFavored"
        :id="'favored-button-'+product.id"
      >
        <v-icon color="yellow accent-2" v-if="isFavored">star</v-icon>
        <v-icon v-else>star_border</v-icon>
      </v-btn>-->
      <v-btn
        class="product-favored"
        icon
        x-small
        :id="'product-favored-'+product.id"
      >
        <v-icon color="yellow accent-2" v-if="isFavored">star</v-icon>
        <v-icon v-else>star_border</v-icon>
      </v-btn>
    </v-list-item-action>

  </v-list-item>
</template>

<script>
import {mapActions} from 'vuex';

export default {

  data: function() {
    return {
      isFavored: this.favored.includes(this.product.id),
    };
  },

  props: ['product', 'favored', 'selected', 'status'],

  computed: {

    enabled() {
      const product = this.selected
          .find((product) => product.id === this.product.id);
      const enabled = !!product.selected;
      return enabled;
    },

  },

  methods: {

    ...mapActions(['toggleFavored', 'toggleSelected']),

    updateFavored() {
      const payload = {id: this.product.id, favored: +!this.isFavored};
      this.isFavored = !this.isFavored;
      this.toggleFavored(payload);
    },

    updateCheckbox() {
      const payload = {id: this.product.id, selected: +!this.enabled};
      this.toggleSelected(payload);
    },

  },
};
</script>

<style lang="css" scoped>
h5 {
  width: 0
}
</style>
