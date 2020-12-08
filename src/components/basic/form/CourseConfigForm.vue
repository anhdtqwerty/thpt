<template>
  <v-form ref="form" lazy-validation>
    <v-text-field
      outlined
      dense
      label="Số lượng học viên tối đa *"
      placeholder="Nhập Số lượng học viên tối đa "
      v-model="min"
    ></v-text-field>
    <v-text-field
      outlined
      dense
      label="Số lượng học viên tối thiểu"
      placeholder="Nhập Số lượng học viên tối thiểu "
      v-model="max"
    ></v-text-field>
    <v-text-field
      outlined
      dense
      label="Số buổi học mặc định"
      v-model="count"
      type="number"
    ></v-text-field>
  </v-form>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  data() {
    return {
      count: '',
      min: '',
      max: '',
    }
  },
  props: {
    course: Object,
  },
  methods: {
    ...mapActions('category', ['fetchCategories']),
    getData() {
      return {
        count: this.count,
        min: this.min,
        max: this.max,
      }
    },
    reset() {
      if (this.course && this.course.data) {
        this.count = this.course.data.count
        this.min = this.course.data.min
        this.max = this.course.data.max
      } else {
        this.min = ''
        this.max = ''
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
