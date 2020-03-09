<template lang="html">
    <v-expansion-panel>

      <v-expansion-panel-header>
        <h3>РЕЗУЛЬТАТ</h3>
      </v-expansion-panel-header>


      <v-expansion-panel-content>
        <Result />
      </v-expansion-panel-content>

    </v-expansion-panel>
</template>

<script>
import Result from '@/components/content/result/Result';

export default {

  components: {
    Result,
  },

};
/*
import { mapActions, mapState } from 'vuex'


  data: () => ({
    enabled: false
  }),

  computed: {

    ...mapState(['isFilterOn', 'selected', 'status']),

    disabled() {
      return !this.status.selected
    },

    indeterminate() {
      const ProductsAreInDifferentStates = this.selected
        .some((curVal, index, array) => curVal.selected !== array[0].selected)
      const indeterminate = this.disabled ? false : ProductsAreInDifferentStates
      if (!indeterminate) {
        this._setEnabled()
      }
      return indeterminate
    }
  },

  methods: {

    ...mapActions(['toggleSelected', 'toggleFilter']),

    _setEnabled() {
      const everyProductIsSelected = this.selected.every(
        curVal => curVal.selected
      )
      const enabled = this.disabled ? false : everyProductIsSelected
      this.enabled = enabled
    },

    updateCheckbox() {
      const enabled = this.indeterminate ? true : !this.enabled
      const payload = { all: true, selected: enabled }
      this.toggleSelected(payload)
    },

    updateFavoredFilter() {
      this.toggleFilter()
    }

  }

}*/
</script>

<style lang="css">
</style>
