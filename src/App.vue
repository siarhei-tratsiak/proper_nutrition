<template>
  <v-app>
    <NavBar />

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script lang="ts" setup>
import NavBar from '@/components/nav/NavBar.vue'
import { useI18n } from 'vue-i18n'
import { watch } from 'vue'

const { locale, t } = useI18n()

watch(locale, (newLocale) => {
  document.documentElement.lang = newLocale
  document.title = t('title')
})

</script>
