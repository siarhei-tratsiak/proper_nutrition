<template lang="html">
  <!--<v-expansion-panels>
    <Category
      v-for="categoryListItem in filteredProductsList"
      :key="categoryListItem.category.id"
      :categoryListItem="categoryListItem"
    />
  </v-expansion-panels>-->
  <v-list>
    <Category
      v-for="categoryListItem in filteredProductsList"
      :key="categoryListItem.category.id"
      :categoryListItem="categoryListItem"
    />
  </v-list>
</template>

<script>
import Category from '@/components/content/products_list/Category';
import {mapState} from 'vuex';

export default {
  components: {
    Category,
  },
  computed: {

    ...mapState(['favored', 'isFilterOn', 'productsList']),

    filteredProductsList() {
      if (this.isFilterOn) {
        const filteredProductsList = this.productsList
            .filter((categoryListItem) => categoryListItem.products
                .filter((product) => product.favored === 1));
        // console.log(filteredProductsList)
        return filteredProductsList;
      }
      return this.productsList;
    },

  },
};
</script>

<style lang="css" scoped>
</style>
