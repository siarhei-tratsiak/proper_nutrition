<template>
  <v-list
    :class="isHorizontal ? '' : 'd-flex justify-center flex-grow-1'"
    nav
    dense
    color="primary"
  >
    <v-list-item
      :class="isHorizontal ? '' : 'mb-0 mr-1 flex-grow-0'"
      :key="menuItem.path"
      :style="isHorizontal ? {} : { 'flex-basis': 'auto' }"
      :to="{ name: menuItem.path }"
      v-for="menuItem in menuItems"
    >
      <v-list-item-icon :class="{ 'dense-icon': !isHorizontal }">
        <v-icon>{{ menuItem.icon }}</v-icon>
      </v-list-item-icon>
      <v-list-item-title
        :class="'d-none d-' + (isHorizontal ? 'md' : 'xs') + '-flex'"
      >{{ menuItem.title }}</v-list-item-title>
    </v-list-item>
  </v-list>
</template>

<script>
export default {
  data: function() {
    return {
      menuItems: [
        { path: "Home", icon: "mdi-home", title: "На главную" },
        { path: "Result", icon: "mdi-hamburger", title: "Результат" },
        { path: "List", icon: "mdi-format-list-checks", title: "Продукты" },
        { path: "Ration", icon: "mdi-calendar-month", title: "Рацион" }
      ]
    };
  },
  props: ["isHorizontal"]
};
</script>

<style>
.dense-icon {
  margin-right: 0 !important;
}
</style>
