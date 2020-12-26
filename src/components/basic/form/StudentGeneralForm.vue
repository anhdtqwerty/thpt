<template>
  <v-form v-model="valid" ref="form" v-bind="this.$attrs">
    <v-row>
      <v-col cols="12">
        <v-text-field
          v-model="name"
          label="Họ và tên"
          required
          outlined
          dense
          @blur="nameLostFocus()"
        ></v-text-field>
        <v-text-field
          :rules="[rules.required]"
          v-model="username"
          outlined
          dense
          label="Mã học sinh"
          disabled
        ></v-text-field>
        <autocomplete-class
          v-model="classData"
          return-object
          label="Chọn lớp"
          required
          outlined
          @onChange="console.log(this.classData)"
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
          :items="['male', 'female']"
          label="Giới Tính"
          dense
          outlined
          required
        ></v-select>
        <v-text-field
          v-model="frequentlyAddress"
          label="Quê quán"
          required
          outlined
          dense
        ></v-text-field>
        <v-text-field
          v-model="ethnic"
          label="Dân tộc"
          required
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
    username: '',
    gender: '',
    dob: '',
    ethnic: '',
    frequentlyAddress: '',
    classData: {},
    rules: {
      required: (value) => !!value || 'Required.',
      min: (v) => v.length >= 6 || 'Min 8 characters',
      email: (v) => /.+@.+/.test(v) || 'E-mail must be valid',
    },
  }),
  created() {
    if (this.student) {
      this.reset()
    }
  },
  methods: {
    ...mapActions('user', ['generateUserName', 'validateEmail']),
    async nameLostFocus() {
      const {
        username,
        // eslint-disable-next-line
        username_indexing,
        // eslint-disable-next-line
        username_no,
      } = await this.generateUserName(this.name)
      this.username = username
      // eslint-disable-next-line
      this.username_indexing = username_indexing
      // eslint-disable-next-line
      this.username_no = username_no
    },
    getData() {
      console.log(this.classData)
      return {
        name: this.name,
        username: this.username,
        gender: this.gender,
        dob: this.dob,
        ethnic: this.ethnic,
        frequentlyAddress: this.frequentlyAddress,
        classData: this.classData,
      }
    },
    validate() {
      this.$refs.form.validate()
    },
    reset() {
      this.name = this.student.name
      this.username = this.student.username
      this.gender = this.student.gender
      this.dob = this.student.dob
      this.ethnic = this.student.data.ethnic
      this.frequentlyAddress = this.student.data.frequentlyAddress
      this.classData = this.student.classData[0].title
    },
    resetValidation() {
      this.$refs.form.resetValidation()
    },
  },
  watch: {
    student(student) {
      this.reset()
    },
    classData(classData) {
      console.log(this.classData)
    }
  },
}
</script>
