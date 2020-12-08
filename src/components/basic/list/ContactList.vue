<template>
  <v-list subheader>
    <v-list-item two-line v-for="item in contacts" :key="item.id">
      <v-list-item-content>
        <v-list-item-title>Tên: {{item.parentName}}</v-list-item-title>
        <v-list-item-subtitle>Phone: {{item.parentPhone}}</v-list-item-subtitle>
        <v-list-item-subtitle>Email: {{item.parentEmail}}</v-list-item-subtitle>
      </v-list-item-content>
      <v-list-item-icon>
        <v-icon @click="$emit('edit')">edit</v-icon>
      </v-list-item-icon>
    </v-list-item>
    <v-divider></v-divider>
    <v-list-item>
      <v-list-item-content>
        <v-btn text @click="$emit('add')">
          <v-icon>add</v-icon>Thêm Liên Lạc
        </v-btn>
      </v-list-item-content>
    </v-list-item>
  </v-list>
</template>

<script>
export default {
  props: {
    contacts: {
      type: [Array],
      default: () => {}
    }
  }
}
</script>

<style scoped>
</style>
