<template>
  <div>
    <LeftMenu :isMiniVariant="isMiniVariant" v-if="status.isHorizontal" />
    <TopMenu v-else />
  </div>
</template>

<script>
import { debounce } from 'lodash'
import LeftMenu from '@/components/navigation/LeftMenu.vue'
import TopMenu from '@/components/navigation/TopMenu.vue'
import { mapActions, mapMutations, mapState } from 'vuex'

export default {
  created: function () {
    this.setPlatform()
  },

  beforeDestroy: function () {
    window.removeEventListener('resize', this.listener)
    window.removeEventListener('orientationchange', this.listener)
  },

  components: {
    LeftMenu,
    TopMenu
  },

  computed: {
    ...mapState(['platform', 'status'])
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
    ...mapActions(['setPlatform']),

    ...mapMutations(['setStateObject']),

    _checkHorizontal: function () {
      let isHorizontal = window.innerWidth > window.innerHeight
      if (this.platform === 'android') {
        isHorizontal = window.screen.orientation.type.includes('landscape')
      }
      const orientationChanged = isHorizontal !== this.status.isHorizontal
      if (orientationChanged) {
        const payload = { objectName: 'status', state: { isHorizontal } }
        this.setStateObject(payload)
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
    if (this.platform === 'android') {
      window.addEventListener('orientationchange', this.listener)
    } else {
      window.addEventListener('resize', this.listener)
    }
  }
}
</script>
