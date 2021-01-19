<template>
  <v-form v-model="valid" ref="form" v-bind="this.$attrs">
    <v-row>
      <v-col cols="12">
        <v-text-field
          v-model="name"
          label="Họ và tên"
          outlined
          dense
        ></v-text-field>
        <autocomplete-class
          v-model="classes"
          :defaultClasses="classes"
          return-object
          label="Chọn lớp"
          outlined
          multiple
          dense
        ></autocomplete-class>
        <date-picker
          :date.sync="dob"
          label="Ngày Sinh"
          dense
          outlined
        ></date-picker>
        <v-select
          v-model="gender"
          :items="genderList"
          item-text="title"
          item-value="value"
          label="Giới Tính"
          dense
          outlined
        ></v-select>
        <v-text-field
          v-model="frequentlyAddress"
          label="Quê quán"
          outlined
          dense
        ></v-text-field>
        <v-text-field
          v-model="ethnic"
          label="Dân tộc"
          outlined
          dense
        ></v-text-field>
      </v-col>
    </v-row>
  </v-form>
</template>

<script>
// import { get } from 'lodash'
import DatePicker from '@/components/basic/picker/DateIOSPicker.vue'
import AutocompleteClass from '@/components/basic/input/AutocompleteClass'
import { mapActions } from 'vuex'
export default {
  components: { DatePicker, AutocompleteClass },
  props: {
    student: {
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
    classes: [],
    rules: {
      required: (value) => !!value || 'Required.',
      min: (v) => v.length >= 6 || 'Min 8 characters',
      email: (v) => /.+@.+/.test(v) || 'E-mail must be valid',
    },
    genderList: [
      { value: 'male', title: 'Nam' },
      { value: 'female', title: 'Nữ' },
    ],
  }),
  created() {
    if (this.student) {
      this.name = this.student.name
      this.gender = this.student.gender
      this.dob = this.student.dob
      this.ethnic = this.student.data.ethnic
      this.frequentlyAddress = this.student.data.frequentlyAddress
      this.classes = this.student.classes
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
        classes: this.classes,
      }
    },
    validate() {
      return this.$refs.form.validate()
    },
    reset() {
      this.$refs.form.reset()
    },
    resetValidation() {
      this.$refs.form.resetValidation()
    },
  }
}
</script>
