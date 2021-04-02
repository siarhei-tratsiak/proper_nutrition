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
        :class="horizontalDependencies.titleClass"
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
  computed: {
    ...mapState(['status']),

    horizontalDependencies: function () {
      const horizontal = {
        iconClass: '',
        listClasses: '',
        listItemClasses: '',
        listitemStyle: {},
        titleClass: 'd-md-flex'
      }
      const vertical = {
        iconClass: 'dense-icon',
        listClasses: 'd-flex justify-center flex-grow-1',
        listItemClasses: 'mb-0 mr-1 flex-grow-0',
        listitemStyle: { 'flex-basis': 'auto' },
        titleClass: 'd-xs-flex'
      }
      return this.status.isHorizontal ? horizontal : vertical
    }
  },

  data: function () {
    return {
      menuItems: [
        { path: 'Home', icon: 'mdi-home', title: 'На главную' },
        { path: 'Result', icon: 'mdi-hamburger', title: 'Результат' },
        { path: 'Products', icon: 'mdi-format-list-checks', title: 'Продукты' },
        { path: 'Ration', icon: 'mdi-calendar-month', title: 'Рацион' },
        { path: 'Settings', icon: 'mdi-cog', title: 'Настройки' }
      ]
    }
  }
}
</script>

<style>
.dense-icon {
  margin-right: 0 !important;
}
</style>
