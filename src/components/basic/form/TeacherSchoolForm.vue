<template>
  <v-form v-model="valid" ref="form" v-bind="this.$attrs">
    <v-row>
      <v-col cols="12">
        <v-autocomplete
          :items="typeList"
          item-text="title"
          item-value="value"
          ref="type"
          v-model="type"
          label="Loại cán bộ"
          outlined
          dense
        ></v-autocomplete>
        <v-text-field
          ref="schoolDate"
          v-model="schoolDate"
          label="Năm vào trường"
          outlined
          dense
        ></v-text-field>
        <v-select
          auto-select-first
          :items="teacherStatus"
          item-text="title"
          item-value="value"
          ref="status"
          v-model="status"
          label="Trạng thái hiện tại"
          outlined
          dense
        ></v-select>
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
    status: 'active',
    teacherStatus: [
      { title: 'Đang dạy', value: 'active' },
      { title: 'Không dạy', value: 'block' },
    ],
    typeList: [
      { title: 'Ngắn hạn', value: 'short-tern' },
      { title: 'Dài hạn', value: 'long-tern' },
    ],
    rules: {
      required: (value) => !!value || 'Required.',
      min: (v) => v.length >= 6 || 'Min 8 characters',
      email: (v) => /.+@.+/.test(v) || 'E-mail must be valid',
    },
  }),
  created() {
    if (this.teacher) {
      this.type = this.teacher.type
      this.schoolDate = this.teacher.metadata.schoolDate
      this.status = this.teacher.status
    } else {
      this.reset()
    }
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
      return this.$refs.form.validate()
    },
    reset() {
      // this.$refs.form.reset()
      this.status = 'active'
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
