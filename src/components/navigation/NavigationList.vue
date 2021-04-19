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
import {
  mdiHome,
  mdiHamburger,
  mdiFormatListChecks,
  mdiCalendarMonth,
  mdiCog
} from '@mdi/js'

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
    },

    menuItems: function () {
      return [
        {
          path: 'Home',
          icon: mdiHome,
          title: this.$t('menu.main')
        },
        {
          path: 'Result',
          icon: mdiHamburger,
          title: this.$t('menu.result')
        },
        {
          path: 'Products',
          icon: mdiFormatListChecks,
          title: this.$t('menu.products')
        },
        {
          path: 'Ration',
          icon: mdiCalendarMonth,
          title: this.$t('menu.ration')
        },
        {
          path: 'Settings',
          icon: mdiCog,
          title: this.$t('menu.settings')
        }
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
