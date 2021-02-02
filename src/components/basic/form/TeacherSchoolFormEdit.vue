<template>
  <v-form v-model="valid" ref="form" v-bind="this.$attrs">
    <p class="text-subtitle-2 mb-0">2. Thông tin tại trường</p>
    <v-row class="pr-12">
      <v-col class="d-flex pb-0" cols="12">
        <v-subheader class="px-0">Loại cán bộ</v-subheader>
        <v-autocomplete
          :items="typeList"
          item-text="title"
          item-value="value"
          v-model="type"
          dense
          hide-details
          :outlined="edit"
        ></v-autocomplete>
      </v-col>
      <v-col class="d-flex pb-0" cols="12">
        <v-subheader class="px-0">Năm vào trường</v-subheader>
        <v-text-field
          hide-details
          :outlined="edit"
          v-model="schoolDate"
          dense
        ></v-text-field>
      </v-col>
      <v-col class="d-flex pb-0" cols="12">
        <v-subheader class="px-0">Trạng thái hiện tại</v-subheader>
        <v-select
          hide-details
          :outlined="edit"
          auto-select-first
          :items="teacherStatus"
          item-text="title"
          item-value="value"
          v-model="status"
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
    edit: Boolean,
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
      this.type = this.teacher.metadata.type
      this.schoolDate = this.teacher.metadata.schoolDate
      this.status = this.teacher.status
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
    async reset() {
      await this.$refs.form.reset()
      this.status = 'active'
    },
    resetValidation() {
      this.$refs.form.resetValidation()
    },
  },
}
</script>
<style scoped>
.v-subheader {
  width: 30%;
}
</style>
