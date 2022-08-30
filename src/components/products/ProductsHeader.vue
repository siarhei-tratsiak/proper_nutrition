<template>
  <v-card-title class="products-header">
    {{ header }}

    <DefaultButton />

    <ProductsSearch />
  </v-card-title>
</template>

<script lang="ts" setup>
import DefaultButton from '@/components/products/DefaultButton.vue'
import ProductsSearch from '@/components/products/ProductsSearch.vue'
import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'
import { computed } from 'vue'
import NutrientService from '@/services/nutrient/nutrient'

const { locale, t } = useI18n()
const route = useRoute()

const nutrientService = computed(() => new NutrientService(locale.value))

const header = computed(() => {
  const nutrientId = route.query.nutrient_id
  const nutrientName = nutrientService.value.getNutrientName(nutrientId)

  return t('products.header') +
    (nutrientName ? t('products.sorted', { nutrientName }) : '')
})
</script>

<style>
.products-header {
  display: flex;
  justify-content: space-between;
}
</style>
