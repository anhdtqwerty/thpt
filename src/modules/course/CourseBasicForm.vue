<template>
  <v-form ref="form" lazy-validation>
    <v-text-field
      outlined
      label="Tên Khóa học *"
      dense
      placeholder="Nhập tên khóa học"
      v-model="title"
    ></v-text-field>
    <v-text-field
      outlined
      label="Mã Khóa học *"
      dense
      placeholder="Nhập mã khóa học"
      v-model="code"
    ></v-text-field>
    <v-text-field
      outlined
      label="Mô Tả"
      dense
      placeholder="Nhập mô tả khóa học"
      v-model="description"
    ></v-text-field>
  </v-form>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  data() {
    return {
      code: '',
      title: '',
      description: '',
    }
  },
  props: {
    course: Object,
  },
  methods: {
    ...mapActions('category', ['fetchCategories']),
    getData() {
      return {
        title: this.title,
        code: this.code,
        description: this.description,
      }
    },
    reset() {
      if (this.course) {
        this.title = this.course.title
        this.code = this.course.code
        this.description = this.course.description
      } else {
        this.title = ''
        this.code = ''
        this.description = ''
      }
    },
  },
  created() {
    this.reset()
  },
  watch: {
    course() {
      this.reset()
    },
  },
}
</script>
