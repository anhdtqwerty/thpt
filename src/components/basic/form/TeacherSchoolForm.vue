<template>
  <v-form ref="form" v-bind="this.$attrs">
    <v-row>
      <v-col class="pb-0" cols="12" md="6">
        <v-autocomplete
          :items="typeList"
          item-text="title"
          item-value="value"
          v-model="type"
          label="Loại cán bộ"
          outlined
          :rules="[$rules.required]"
          class="required"
          dense
        ></v-autocomplete>
      </v-col>
      <v-col class="pb-0" cols="12" md="6">
        <v-text-field
          v-model="schoolDate"
          label="Năm vào trường"
          outlined
          dense
          required
          :rules="[$rules.required, $rules.yearNotRequired]"
          type="number"
          class="required"
        ></v-text-field>
      </v-col>
      <v-col class="pt-0" cols="12" md="6">
        <v-select
          :items="teacherStatus"
          item-text="title"
          item-value="value"
          v-model="status"
          label="Trạng thái hiện tại"
          outlined
          dense
          :rules="[$rules.required]"
          class="required"
        ></v-select>
      </v-col>
    </v-row>
  </v-form>
</template>

<script>
import { get } from 'lodash'

export default {
  props: { teacher: Object, formState: Boolean },
  data: () => ({
    type: '',
    schoolDate: '',
    status: '',
    teacherStatus: [
      { title: 'Đang dạy', value: 'active' },
      { title: 'Đã nghỉ', value: 'left' }
    ],
    typeList: [
      { title: 'Thỉnh giảng', value: 'short-term' },
      { title: 'Biên chế', value: 'long-term' }
    ]
  }),
  computed: {},
  created() {
    this.initData()
  },
  methods: {
    initData() {
      if (this.teacher) {
        this.type = this.teacher.type
        this.schoolDate = get(this.teacher, 'metadata.schoolDate')
        this.status = this.teacher.status
      }
    },
    getData() {
      return {
        type: this.type,
        schoolDate: this.schoolDate,
        status: this.status
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
    }
  },
  watch: {
    formState(formState) {
      if (!formState) {
        this.initData()
      }
    }
  }
}
</script>
