<template>
  <v-form v-model="valid" ref="form" v-bind="this.$attrs">
    <v-row>
      <v-col cols="12">
        <v-text-field
          ref="type"
          v-model="type"
          placeholder="Loại cán bộ"
          required
          dense
        ></v-text-field>
        <v-text-field
          ref="schoolDate"
          v-model="schoolDate"
          placeholder="Năm vào trường"
          required
          dense
        ></v-text-field>
        <v-autocomplete
          :item="teacherStatus"
          item-text="title"
          item-value="value"
          ref="status"
          v-model="status"
          placeholder="Trạng thái hiện tại"
          required
          dense
        ></v-autocomplete>
      </v-col>
    </v-row>
  </v-form>
</template>

<script>
// import { get } from 'lodash'
export default {
  props: {
    teacher: {
      type: [Object],
      default: () => {},
    },
  },
  data: () => ({
    valid: true,
    type: '',
    schoolDate: '',
    status: '',
    teacherStatus: [
      { title: 'Đang dạy', value: 'active' },
      { title: 'Không dạy', value: 'block' },
    ],
  }),
  created() {
    this.reset()
  },
  methods: {
    getData() {
      return {
        type: this.type,
        schoolDate: this.schoolDate,
        status: this.status,
      }
    },
    validate() {
      this.$refs.form.validate()
    },
    reset() {
      this.type = this.teacher.type
      this.schoolDate = this.teacher.metadata.schoolDate
      this.status = this.teacher.status
    },
    resetValidation() {
      this.$refs.form.resetValidation()
    },
  },
  watch: {
    teacher(teacher) {
      this.reset()
    },
  },
}
</script>
