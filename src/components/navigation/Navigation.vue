<template>
  <div>
    <LeftMenu :isMiniVariant="isMiniVariant" v-if="isHorizontal" />
    <TopMenu v-else />
  </div>
</template>

<script>
import { debounce } from 'lodash'
import LeftMenu from '@/components/navigation/LeftMenu.vue'
import TopMenu from '@/components/navigation/TopMenu.vue'
import { mapMutations, mapState } from 'vuex'

export default {
  beforeDestroy: function () {
    window.removeEventListener('resize', this.listener)
  },

  components: {
    LeftMenu,
    TopMenu
  },

  computed: {
    ...mapState(['isHorizontal'])
  },

  data: function () {
    return {
      delayMS: 300,
      isMiniVariant: false,
      listener: debounce(this._onResize, this.delayMS),
      viewportBreakpoint: 960
    }
  },

  methods: {
    ...mapMutations(['setHorizontal']),

    _checkHorizontal: function () {
      const isHorizontal = window.innerWidth > window.innerHeight
      const orientationChanged = isHorizontal !== this.isHorizontal
      if (orientationChanged) {
        this.setHorizontal(isHorizontal)
      }
    },

    _onResize: function () {
      this._setMini()
      this._checkHorizontal()
    },

    _setMini: function () {
      this.isMiniVariant = window.innerWidth < this.viewportBreakpoint
    }
  },

  mounted: function () {
    this._onResize()
    window.addEventListener('resize', this.listener)
  }

}
</script>
