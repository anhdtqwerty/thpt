<template>
  <v-form ref="form" v-model="valid" v-bind="this.$attrs">
    <div class="mb-6">
      <p class="text-h5 primary--text mb-0">{{ student.name }}</p>
      <p class="text-subtitle-2">{{ student.code }}</p>
    </div>
    <v-row class="align-bottom">
      <v-col
        v-for="studentDetail in studentDetails"
        :key="studentDetail.title"
        cols="3"
      >
        <p class="text-caption mb-0">{{ studentDetail.title }}</p>
        <p class="text-subtitle-2">{{ studentDetail.value }}</p>
      </v-col>
    </v-row>
  </v-form>
</template>

<script>
export default {
  data() {
    return {
      valid: true,
      studentDetails: [
        { title: 'Lớp', value: this.student.classes[0].title },
        { title: 'Niên khóa', value: this.student.generation.name },
        { title: 'Số điện thoại', value: this.student.phone },
        { title: 'Email', value: this.student.email },
      ],
    }
  },
  props: {
    student: Object,
  },
}
</script>

<style>
</style>
