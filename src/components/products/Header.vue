<template>
    <v-card-title>
      {{ $t('products.header')}}

      <v-spacer></v-spacer>

      <DefaultButton />

      <v-spacer></v-spacer>

      <Search />
    </v-card-title>
</template>

<script>
import DefaultButton from '@/components/products/DefaultButton'
import Search from '@/components/products/Search'

export default {
  components: {
    DefaultButton,
    Search
  }
}
</script>
