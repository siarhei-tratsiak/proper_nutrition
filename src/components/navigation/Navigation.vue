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
    ...mapState(['status'])
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
    ...mapMutations(['setStateObject']),

    _checkHorizontal: function () {
      const isHorizontal = window.innerWidth > window.innerHeight
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
    window.addEventListener('resize', this.listener)
  }

}
</script>
