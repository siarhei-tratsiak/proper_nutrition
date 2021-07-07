<template>
    <v-alert
      type="warning"
      v-if='status.resultStatus !== 0'
    >
      <template v-if='status.resultStatus === null'>
        {{ $t('noRecommendations') }}
      </template>

      <i18n path="advice" tag="span" v-else>
        <template v-slot:products>
          <router-link :to="{ name: 'Products' }">
            <v-icon >{{ mdiFormatListChecks }}</v-icon>
          </router-link>
        </template>

        <template v-slot:settings>
          <router-link :to="{ name: 'Settings' }">
            <v-icon >{{ mdiCog }}</v-icon>
          </router-link>
        </template>

        <template v-slot:ration>
          <router-link :to="{ name: 'Ration' }">
            <v-icon >{{ mdiCalendarMonth }}</v-icon>
          </router-link>
        </template>
      </i18n>
    </v-alert>
</template>

<script>
import { mapState } from 'vuex'
import {
  mdiCalendarMonth,
  mdiCog,
  mdiFormatListChecks
} from '@mdi/js'

export default {
  computed: {
    ...mapState(['status'])
  },

  data: function () {
    return {
      mdiCalendarMonth,
      mdiCog,
      mdiFormatListChecks
    }
  }
}
</script>

<style scoped>
  .v-alert {
    margin: 8px;
  }
</style>
