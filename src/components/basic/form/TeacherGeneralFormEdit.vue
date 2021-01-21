<template>
  <v-form v-model="valid" ref="form" v-bind="this.$attrs">
    <v-row>
      <v-col class="pb-0" cols="12" md="6">
        <v-text-field
          ref="name"
          v-model="name"
          label="Tên giáo viên"
          outlined
          dense
        ></v-text-field>
      </v-col>
      <v-col class="pb-0" cols="12" md="6">
        <date-picker
          :date.sync="dob"
          label="Ngày Sinh"
          outlined
          dense
        ></date-picker>
      </v-col>
    </v-row>
    <v-row>
      <v-col class="pb-0" cols="12" md="6">
        <v-select
          ref="gender"
          v-model="gender"
          :items="['male', 'female']"
          label="Giới tính"
          outlined
          dense
        ></v-select>
      </v-col>
      <v-col class="pb-0" cols="12" md="6">
        <v-text-field
          ref="ethinic"
          v-model="ethnic"
          label="Dân tộc"
          outlined
          dense
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col class="pb-0" cols="12">
        <v-text-field
          ref="frequentlyAddress"
          v-model="frequentlyAddress"
          label="Địa chỉ thường trú"
          outlined
          dense
        ></v-text-field>
      </v-col>
    </v-row>
  </v-form>
</template>

<script>
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
      this.name = this.teacher.name
      this.gender = this.teacher.gender
      this.dob = this.teacher.metadata.dob
      this.ethinic = this.teacher.metadata.ethinic
      this.frequentlyAddress = this.teacher.metadata.frequentAddress
    }
  },
  methods: {
    ...mapActions('user', ['generateStudentCode', 'validateEmail']),
    getData() {
      return {
        name: this.name,
        gender: this.gender,
        dob: this.dob,
        ethnic: this.ethnic,
        frequentlyAddress: this.frequentlyAddress,
      }
    },
    validate() {
      this.$refs.form.validate()
    },
    reset() {
      this.$refs.form.reset()
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
