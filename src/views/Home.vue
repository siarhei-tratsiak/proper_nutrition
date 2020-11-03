<template>
  <div
    :class="color"
    class="align-center d-flex flex-column"
    id="background"
  >

    <p class="d-flex flex-grow-1 align-center">НАЖМИТЕ КНОПКУ</p>

    <RunButton v-if="ready" />

    <p class="d-flex flex-grow-1 align-center">
      ЧТОБЫ ВЫЧИСЛИТЬ РАЦИОН ЗА ПЕРИОД:
    </p>

    <SelectPeriod />

  </div>
</template>

<script>
import { getToday, getTomorrow } from '@/api/dates'
import { mapMutations, mapState } from 'vuex'
import RunButton from '@/components/home/RunButton.vue'
import SelectPeriod from '@/components/home/SelectPeriod.vue'

export default {
  name: 'Home',

  components: {
    RunButton,
    SelectPeriod
  },

  computed: {
    ...mapState(['settings']),

    ready: function () {
      return !!this.settings.userID
    }
  },

  created: function () {
    const start = getToday()
    const end = getTomorrow()
    this.setPeriod({ start, end })
  },

  data: () => ({
    color: 'green accent-2'
  }),

  methods: {
    ...mapMutations(['setPeriod'])
  }
}
</script>

<style scoped>
#background {
  height: 100%;
}
</style>
