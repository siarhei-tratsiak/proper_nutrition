<template>
  <v-list
    class="nav-list"
    :class="horizontalDependencies.listClasses"
    color="primary"
    dense
    nav
  >
    <v-list-item
      :class="horizontalDependencies.listItemClasses"
      :key="index"
      :style="horizontalDependencies.listitemStyle"
      :to="{ name: menuItem.name }"
      v-for="(menuItem, index) in menuItems"
    >
      <template v-slot:prepend>
        <v-icon
          :class="horizontalDependencies.iconClass"
          :icon="menuItem.icon"
        />
      </template>

      <v-list-item-title
        :class="horizontalDependencies.titleClass"
        class="d-none"
      >
        {{ menuItem.title }}
      </v-list-item-title>
    </v-list-item>
  </v-list>
</template>

<script setup lang='ts'>
import { computed } from 'vue'
import { IPagesService, IMenuItem } from '@/services/pages/pages.types'
import { PagesService } from '@/services/pages/pages'
import { useStatusStore } from '@/store/status/status'
import { IHorizontalDependencies } from './NavList.types'
import pages from '@/data/pages.json'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const pagesService: IPagesService = new PagesService(pages, t)

const horizontalDependencies = computed((): IHorizontalDependencies => {
  const statusStore = useStatusStore()

  const horizontal: IHorizontalDependencies = {
    iconClass: '',
    listClasses: '',
    listItemClasses: '',
    listitemStyle: {},
    titleClass: 'd-md-flex'
  }

  const vertical: IHorizontalDependencies = {
    iconClass: 'dense-icon',
    listClasses: 'd-flex justify-center flex-grow-1',
    listItemClasses: 'mb-0 mr-1 flex-grow-0',
    listitemStyle: { 'flex-basis': 'auto' },
    titleClass: 'd-xs-flex'
  }

  return statusStore.isVertical ? vertical : horizontal
})

const menuItems = computed((): IMenuItem[] => {
  return pagesService.getMenuItems()
})
</script>

<style scoped>
.nav-list {
  overflow-x: hidden;
}
>>> .dense-icon {
  margin-right: 0;
}
</style>
