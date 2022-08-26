<template>
  <component
    :is="component"
    permanent
    :rail="isMiniVariant"
    rail-width="56"
  >
    <NavList />
  </component>
</template>

<script lang="ts" setup>
import NavList from '@/components/nav/navList/NavList.vue'
import { computed, onMounted, ref } from 'vue'
import { useStatusStore } from '@/store/status/status'
import { debounce } from 'lodash'
import { VAppBar, VNavigationDrawer } from 'vuetify/lib/components'

const statusStore = useStatusStore()

const isMiniVariant = ref(false)
const viewportBreakpoint = 960
const delayMS = 300

const component = computed(() =>
  statusStore.isVertical ? VAppBar : VNavigationDrawer
)

onMounted(() => {
  function onResize () {
    function setMini () {
      isMiniVariant.value = window.innerWidth < viewportBreakpoint
    }

    function onOrientationChange () {
      const isVertical = window.innerWidth < window.innerHeight
      const orientationChanged = isVertical !== statusStore.isVertical

      if (orientationChanged) {
        statusStore.setIsVertical(isVertical)
      }
    }

    setMini()
    onOrientationChange()
  }

  const listener = debounce(onResize, delayMS)

  onResize()
  window.addEventListener('resize', listener)
})
</script>
