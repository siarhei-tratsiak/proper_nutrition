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
import { dbService } from '@/services/db/db'

const { locale, t } = useI18n()

dbService.initSelected()

watch(locale, (newLocale) => {
  document.documentElement.lang = newLocale
  document.title = t('title')
})

</script>
