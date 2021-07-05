<template>
  <v-list-item v-if="student" :key="student.id" @click="$emit('change', student)">
    <v-list-item-avatar>
      <v-img :src="avatar"></v-img>
    </v-list-item-avatar>

    <v-list-item-content>
      <router-link :to="'/student/' + student.id">
        <v-list-item-title>{{ student.name }}</v-list-item-title>
      </router-link>
      <v-list-item-subtitle>{{ student.code }}</v-list-item-subtitle>
    </v-list-item-content>
    <v-btn icon v-if="append" @click="$emit('itemClick', student)">
      <v-icon :color="append.icon === 'mdi-check' ? 'green' : 'red'">{{ append.icon }}</v-icon>
    </v-btn>
  </v-list-item>
  <p v-else></p>
</template>

<script>
import { get } from 'lodash'

export default {
  props: {
    student: Object,
    prepend: Object,
    append: Object,
    attendance: Object
  },
  computed: {
    avatar() {
      return get(this.student, 'avatar.url', '/default-avatar.png')
    }
  }
}
</script>

<style scoped></style>
