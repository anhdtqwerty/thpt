<template>
  <v-list-item link :to="item.to">
    <v-list-item-icon  v-if="item.icon">
      <v-icon class="mx-auto">{{item.icon}}</v-icon>
    </v-list-item-icon>
    <v-list-item-title>{{item.label}}</v-list-item-title>
  </v-list-item>
</template>

<script type="text/babel">
export default {
  props: {
    item: {
      type: Object
    }
  }
}
</script>
