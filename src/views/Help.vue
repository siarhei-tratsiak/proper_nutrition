<template>
  <div class="align-start d-flex justify-center">
    <v-card class="help-card ma-1">
      <v-card-text>
        <ol>
          <i18n path="help[0]" tag="li">
            <template v-slot:settings>
              <router-link :to="{ name: 'Settings' }">
                <v-icon >{{ mdiCog }}</v-icon>
              </router-link>
            </template>

            <template v-slot:img>
              <img class="center-block" :src="src.settings">
            </template>
          </i18n>

          <i18n path="help[1]" tag="li">
            <template v-slot:img>
              <img class="center-block" :src="src.locked">
              <v-icon class="center-block">{{ mdiArrowDownBold }}</v-icon>
              <img class="center-block" :src="src.unlocked">
            </template>
          </i18n>

          <i18n path="help[2]" tag="li">
            <template v-slot:img>
              <img class="center-block" :src="src.noExtrMob" :srcset="`${src.noExtrMob} 600w, ${src.noExtr}`">
              <v-icon class="center-block">{{ mdiArrowDownBold }}</v-icon>
              <img class="center-block" :src="src.extrMob" :srcset="`${src.extrMob} 600w, ${src.extr}`">
            </template>
          </i18n>

          <i18n path="help[3]" tag="li">
            <template v-slot:ration>
              <router-link :to="{ name: 'Ration' }">
                <v-icon >{{ mdiCalendarMonth }}</v-icon>
              </router-link>
            </template>

            <template v-slot:img>
              <img class="center-block" :src="src.ration">
            </template>
          </i18n>

          <i18n path="help[4]" tag="li">
            <template v-slot:products>
              <router-link :to="{ name: 'Products' }">
                <v-icon >{{ mdiFormatListChecks }}</v-icon>
              </router-link>
            </template>

            <template v-slot:img>
              <img class="center-block" :src="src.product">
              <v-icon class="center-block">{{ mdiArrowDownBold }}</v-icon>
              <img class="center-block" :src="src.productSelected">
            </template>
          </i18n>

          <i18n path="help[5]" tag="li">
            <template v-slot:home>
              <router-link :to="{ name: 'Home' }">
                <v-icon >{{ mdiHome }}</v-icon>
              </router-link>
            </template>

            <template v-slot:img>
              <img class="center-block" :src="src.button">
            </template>
          </i18n>
        </ol>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import {
  mdiArrowDownBold,
  mdiCalendarMonth,
  mdiCog,
  mdiFormatListChecks,
  mdiHome
} from '@mdi/js'
import i18n from '@/plugins/i18n'

export default {
  computed: {
    src: function () {
      return {
        button: require('@/assets/button.png'),
        extr: require(`@/assets/extr_${i18n.locale}.png`),
        extrMob: require(`@/assets/extr-mob_${i18n.locale}.png`),
        locked: require(`@/assets/locked_${i18n.locale}.png`),
        noExtr: require(`@/assets/no-extr_${i18n.locale}.png`),
        noExtrMob: require(`@/assets/no-extr-mob_${i18n.locale}.png`),
        product: require(`@/assets/product_${i18n.locale}.png`),
        productSelected: require(`@/assets/product-selected_${i18n.locale}.png`),
        ration: require(`@/assets/ration_${i18n.locale}.png`),
        settings: require(`@/assets/settings_${i18n.locale}.png`),
        unlocked: require(`@/assets/unlocked_${i18n.locale}.png`)
      }
    }
  },

  data: function () {
    return {
      mdiArrowDownBold,
      mdiCalendarMonth,
      mdiCog,
      mdiFormatListChecks,
      mdiHome
    }
  }
}
</script>

<style>
  .center-block {
    display: block !important;
    margin: auto;
    max-width: 100%;
  }

  .help-card {
    margin: auto;
    max-width: 600px;
  }
</style>
