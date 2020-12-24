<template>
  <v-menu bottom offset-y>
    <template v-slot:activator="{ on }">
      <v-btn x-small text v-on="on" icon>
        <v-icon small>mdi-dots-horizontal</v-icon>
      </v-btn>
    </template>
    <slot></slot>
  </v-menu>
</template>
<script>
export default {}
</script>
