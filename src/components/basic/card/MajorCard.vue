<template>
  <v-card v-if="major">
    <v-img :src="url" height="200px"></v-img>

    <v-card-title class="text-truncate">
      {{ major.title }}
    </v-card-title>

    <v-card-subtitle class="text-truncate">
      {{ major.descriptions }}
    </v-card-subtitle>
    <v-card-actions>
      <v-btn text :to="'/major/' + major.id">
        <span>Cấu Hình</span>
        <v-icon color="#0D47A1">arrow_forward</v-icon>
      </v-btn>
      <v-spacer></v-spacer>
    </v-card-actions>
  </v-card>
  <v-skeleton-loader class="mx-auto" type="card" v-else></v-skeleton-loader>
</template>

<script>
import _ from 'lodash'
export default {
  props: {
    major: Object
  },
  computed: {
    url() {
      return _.get(this.major, 'avatar.url', '/cover-default.jpg')
    }
  }
}
</script>

<style scoped></style>
