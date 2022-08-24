<template>
  <component
    :is="component"
    :isMiniVariant="isMiniVariant"
  >
    <NavigationList />
  </component>
</template>

<script lang="ts" setup>
import NavigationList from '@/components/nav/navList/NavList.vue'
import { computed, onMounted } from 'vue'
import { useStatusStore } from '@/store/status/status'
import { debounce } from 'lodash'

const statusStore = useStatusStore()

let isMiniVariant = false
const viewportBreakpoint = 960
const delayMS = 300

const component = computed(() =>
  statusStore.isVertical ? 'v-app-bar' : 'v-navigation-drawer'
)

onMounted(() => {
  function onResize () {
    function setMini () {
      isMiniVariant = window.innerWidth < viewportBreakpoint
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
