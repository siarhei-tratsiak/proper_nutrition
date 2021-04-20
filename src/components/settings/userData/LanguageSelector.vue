<template>
  <v-layout align-center fill-height justify-space-between>
    <v-select
      @change="setLanguage"
      filled
      :items="items"
      :label="$t('settings.language.label')"
      :value="items[items.findIndex(item => item.value === $i18n.locale)]"
    >
    </v-select>
  </v-layout>
</template>

<script>
import { mapActions } from 'vuex'
import IndexLocalization from '@/mixins/IndexLocalization'

export default {
  computed: {
    items: function () {
      const ru = this.$t('settings.language.ru')
      const en = this.$t('settings.language.en')
      return [
        { text: ru, value: 'ru' },
        { text: en, value: 'en' }
      ]
    }
  },

  methods: {
    ...mapActions(['setSettings']),

    setLanguage: function (language) {
      this.setSettings({ language })
      this.$i18n.locale = language
      this.localize(language)
    }
  },

  mixins: [IndexLocalization]
}
</script>
