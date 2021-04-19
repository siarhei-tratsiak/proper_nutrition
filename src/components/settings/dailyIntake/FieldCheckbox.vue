<template>
  <v-checkbox
    hide-details
    :off-icon="mdiLock"
    :on-icon="mdiLockOpenVariant"
    v-model="isChecked"
  ></v-checkbox>
</template>

<script>
import { mapActions } from 'vuex'
import { mdiLock, mdiLockOpenVariant } from '@mdi/js'

export default {
  computed: {
    isChecked: {
      get: function () {
        return !!this.mutableData[this.mutableFieldName]
      },

      set: function (value) {
        const payload = { id: this.mutableData.id, value: {} }
        payload.value[this.mutableFieldName] = +value
        this.updateConstraint(payload)
      }
    }
  },

  data: () => ({
    mdiLock,
    mdiLockOpenVariant
  }),

  methods: {
    ...mapActions(['updateConstraint'])
  },

  props: ['mutableData', 'mutableFieldName']
}
</script>
