<template>
  <v-form v-model="valid" ref="form" v-bind="this.$attrs">
    <v-row>
      <v-col class="pb-0" cols="6">
        <v-autocomplete
          :items="typeList"
          item-text="title"
          item-value="value"
          v-model="type"
          label="Loại cán bộ"
          outlined
          class="required"
          :rules="[rules.required]"
          dense
        ></v-autocomplete>
      </v-col>
      <v-col class="pb-0" cols="6">
        <v-text-field
          v-model="schoolDate"
          label="Năm vào trường"
          outlined
          dense
          class="required"
          :rules="[rules.required]"
        ></v-text-field>
      </v-col>
      <v-col class="pb-0" cols="6">
        <v-select
          auto-select-first
          :items="teacherStatus"
          item-text="title"
          item-value="value"
          v-model="status"
          label="Trạng thái hiện tại"
          outlined
          dense
          class="required"
          :rules="[rules.required]"
        ></v-select>
      </v-col>
      <v-col cols="6" class="pb-0"> </v-col>
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
  watch: {
    teacher(teacher) {
      this.reset()
    },
  },
}
</script>
