<template>
  <v-list-item>
    <v-list-item-content>
      <v-list-item-title>{{clazz.code}}</v-list-item-title>
      <v-list-item-subtitle>{{clazz.course.title}}</v-list-item-subtitle>
    </v-list-item-content>
    <v-list-item-action>
      <v-chip small :color="getColor(clazz.status)" dark>{{ clazz.status }}</v-chip>
    </v-list-item-action>
    <v-btn icon v-if="append" @click="$emit('itemClick', student)">
      <v-icon :color="append.icon === 'mdi-check' ? 'green' : 'red'">{{append.icon}}</v-icon>
    </v-btn>
  </v-list-item>
</template>

<script>
import { ListItem } from 'vuetify'

export default {
  extends: ListItem,
  props: {
    clazz: Object
  },
  computed: {},
  methods: {
    getColor (status) {
      if (status === 'opened') return 'green'
      if (status === 'running') return 'primary'
      else if (status === 'pending' || status === 'rejected') return 'red'
      else if (status === 'done') return 'gray'
      else return 'red'
    }
  }
}
</script>

<style scoped>
</style>
