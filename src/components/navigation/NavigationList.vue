<template>
  <v-list
    :class="horizontalDependencies.listClasses"
    color="primary"
    dense
    nav
  >
    <v-list-item
      :class="horizontalDependencies.listItemClasses"
      :key="menuItem.path"
      :style="horizontalDependencies.listitemStyle"
      :to="{ name: menuItem.path }"
      v-for="menuItem in menuItems"
    >
      <v-list-item-icon :class="horizontalDependencies.iconClass">
        <v-icon>{{ menuItem.icon }}</v-icon>
      </v-list-item-icon>
      <v-list-item-title
        :class="horizontalDependencies.titleClasses"
        class="d-none"
      >
        {{ menuItem.title }}
      </v-list-item-title>
    </v-list-item>
  </v-list>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data: function () {
    return {
      menuItems: [
        { path: 'Home', icon: 'mdi-home', title: 'На главную' },
        { path: 'Result', icon: 'mdi-hamburger', title: 'Результат' },
        { path: 'List', icon: 'mdi-format-list-checks', title: 'Продукты' },
        { path: 'Ration', icon: 'mdi-calendar-month', title: 'Рацион' },
        { path: 'Settings', icon: 'mdi-cog', title: 'Настройки' }
      ]
    }
  },

  computed: {
    ...mapState(['isHorizontal']),

    horizontalDependencies: function () {
      const horizontalDependencies = {
        iconClass: ['', 'dense-icon'],
        listClasses: ['', 'd-flex justify-center flex-grow-1'],
        listItemClasses: ['', 'mb-0 mr-1 flex-grow-0'],
        listitemStyle: [{}, { 'flex-basis': 'auto' }],
        titleClasses: ['d-md-flex', 'd-xs-flex']
      }
      for (const key in horizontalDependencies) {
        this._assingValue(key, horizontalDependencies)
      }
      return horizontalDependencies
    }
  },

  methods: {
    _assingValue: function (key, horizontalDependencies) {
      const value = horizontalDependencies[key]
      const [ifTrue, ifFalse] = [...value]
      horizontalDependencies[key] = this._checkHorizonal(ifTrue, ifFalse)
    },

    _checkHorizonal: function (ifTrue, ifFalse) {
      const result = this.isHorizontal ? ifTrue : ifFalse
      return result
    }
  }
}
</script>

<style>
.dense-icon {
  margin-right: 0 !important;
}
</style>
