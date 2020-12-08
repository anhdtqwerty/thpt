<template>
  <v-layout>
    <v-flex md-6>
      <v-list-item three-line>
        <v-list-item-avatar>
          <v-icon class="green white--text">mdi-check</v-icon>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title>Điểm số</v-list-item-title>
          <v-list-item-subtitle>
            <h1 style="color:green">10/10</h1>
          </v-list-item-subtitle>
          <v-list-item-subtitle>Nộp bài: 9h30 ngày 21/12/2020</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  props: {
    student: Object
  }
}
</script>

<style scoped>
.border-right {
  border-right: solid 1px gray;
}
.v-list-item {
  padding-left: 0;
}
</style>
