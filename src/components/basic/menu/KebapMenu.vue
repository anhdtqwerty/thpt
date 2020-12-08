<template>
  <v-menu bottom offset-y>
    <template v-slot:activator="{ on }">
      <v-btn text v-on="on" icon>
        <v-icon>mdi-dots-horizontal</v-icon>
      </v-btn>
    </template>
    <slot></slot>
  </v-menu>
</template>
<script>
export default {}
</script>
