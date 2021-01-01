<template>
  <v-form v-model="valid" ref="form" v-bind="this.$attrs">
    <v-row>
      <v-col cols="12">
        <v-text-field
          ref="type"
          v-model="type"
          label="Loại cán bộ"
          :rules="[rules.required]"
          class="required"
          outlined
          dense
        ></v-text-field>
        <v-text-field
          ref="schoolDate"
          v-model="schoolDate"
          label="Năm vào trường"
          :rules="[rules.required]"
          class="required"
          outlined
          dense
        ></v-text-field>
        <v-autocomplete
          :items="teacherStatus"
          item-text="title"
          item-value="value"
          ref="status"
          v-model="status"
          label="Trạng thái hiện tại"
          :rules="[rules.required]"
          class="required"
          outlined
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
    rules: {
      required: value => !!value || 'Required.',
      min: v => v.length >= 6 || 'Min 8 characters',
      email: v => /.+@.+/.test(v) || 'E-mail must be valid'
    }
  }),
  created() {
    if (this.teacher) {
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
