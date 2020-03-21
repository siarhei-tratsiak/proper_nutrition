<template lang="html">
    <v-dialog
      scrollable
      v-model="status.resultIsOpened"
    >
      <v-card>

        <v-card-title>РЕЗУЛЬТАТ</v-card-title>

        <v-card-text>
          <Result />
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            @click="setStatus({resultIsOpened: false})"
          >
            Close
          </v-btn>
        </v-card-actions>

      </v-card>
    </v-dialog>
</template>

<script>
import Result from '@/components/content/result/Result';
import {mapState, mapMutations} from 'vuex';

export default {

  components: {
    Result,
  },

  computed: {
    ...mapState(['status']),
  },

  methods: {

    ...mapMutations(['setStatus']),

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
