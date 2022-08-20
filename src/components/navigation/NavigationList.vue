<template>
  <v-list
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
import { useStatusStore } from '@/store/status'
import { IHorizontalDependencies } from './NavigationList.types'

const horizontalDependencies = computed((): IHorizontalDependencies => {
  const statusStore = useStatusStore()

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

  return statusStore.isVertical ? vertical : horizontal
})

const pagesService: IPagesService = new PagesService()

const menuItems = computed((): IMenuItem[] => pagesService.getMenuItems())
</script>

<style>
.dense-icon {
  margin-right: 0 !important;
}
</style>
