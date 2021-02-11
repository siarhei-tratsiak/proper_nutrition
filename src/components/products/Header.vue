<template>
    <v-card-title>
      Продукты

      <v-spacer></v-spacer>

      <v-text-field
        append-icon="mdi-magnify"
        dense
        hide-details
        label="Поиск"
        single-line
        v-model="search"
      ></v-text-field>
    </v-card-title>
</template>

<script>
import { mapMutations, mapState } from 'vuex'

export default {
  computed: {
    ...mapState(['productSearch']),

    search: {
      get: function () {
        return this.productSearch
      },

      set: function (payload) {
        return this.setProductSearch(payload)
      }
    }
  },

  methods: {
    ...mapMutations(['setProductSearch'])
  }
}
</script>
