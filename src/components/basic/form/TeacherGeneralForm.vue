<template>
  <v-form v-model="valid" ref="form" v-bind="this.$attrs">
    <v-row>
      <v-col cols="12">
        <v-text-field
          ref="name"
          v-model="name"
          label="Tên giáo viên"
          @blur="nameLostFocus()"
          class="required"
          :rules="[rules.required]"
          outlined
          dense
        ></v-text-field>
        <v-text-field
          v-model="username"
          outlined
          dense
          label="Mã giáo viên"
          disabled
          class="required"
          :rules="[rules.required]"
        ></v-text-field>
        <date-picker
          :date.sync="dob"
          label="Ngày Sinh"
          class="required"
          :rules="[rules.required]"
          outlined
          dense
        ></date-picker>
        <v-select
          ref="gender"
          v-model="gender"
          :items="['male', 'female']"
          label="Giới tính"
          class="required"
          :rules="[rules.required]"
          outlined
          dense
        ></v-select>
        <v-text-field
          ref="frequentlyAddress"
          v-model="frequentlyAddress"
          label="Địa chỉ thường trú"
          :rules="[rules.required]"
          class="required"
          outlined
          dense
        ></v-text-field>
        <v-text-field
          ref="ethinic"
          v-model="ethnic"
          label="Dân tộc"
          :rules="[rules.required]"
          class="required"
          outlined
          dense
        ></v-text-field>
      </v-col>
    </v-row>
  </v-form>
</template>

<script>
// import { get } from 'lodash'
import { mapActions } from 'vuex'
import DatePicker from '@/components/basic/picker/DateIOSPicker.vue'
export default {
  components: { DatePicker },
  props: {
    teacher: {
      type: [Object],
      default: () => {},
    },
  },
  data: () => ({
    username: '',
    username_indexing: '',
    username_no: '',
    valid: true,
    name: '',
    gender: '',
    dob: '',
    ethnic: '',
    frequentlyAddress: '',
    rules: {
      required: (value) => !!value || 'Required.',
      min: (v) => v.length >= 6 || 'Min 8 characters',
      email: (v) => /.+@.+/.test(v) || 'E-mail must be valid',
    },
  }),
  created() {
    if (this.teacher) {
      this.reset()
    }
  },
  methods: {
    ...mapActions('user', ['generateStudentCode', 'validateEmail']),
    async nameLostFocus() {
      const {
        username,
        // eslint-disable-next-line
        username_indexing,
        // eslint-disable-next-line
        username_no
      } = await this.generateStudentCode(this.name)
      this.username = username
      // eslint-disable-next-line
      this.username_indexing = username_indexing
      // eslint-disable-next-line
      this.username_no = username_no
    },
    getData() {
      return {
        name: this.name,
        gender: this.gender,
        dob: this.dob,
        ethnic: this.ethnic,
        frequentlyAddress: this.frequentlyAddress,
        username: this.username,
        username_indexing: this.username_indexing,
        username_no: this.username_no,
      }
    },
    validate() {
      return this.$refs.form.validate()
    },
    reset() {
      this.name = this.teacher.name
      this.gender = this.teacher.gender
      this.dob = this.teacher.metadata.dob
      this.ethnic = this.teacher.metadata.ethnic
      this.frequentlyAddress = this.teacher.metadata.frequentlyAddress
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
