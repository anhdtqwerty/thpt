<template>
  <v-form v-model="valid" ref="form" v-bind="this.$attrs">
    <p class="text-subtitle-2 mb-0">1. Thông tin cơ bản</p>
    <v-row class="pr-12">
      <v-col class="d-flex pb-0" cols="12">
        <v-subheader class="px-0">Họ và tên</v-subheader>
        <v-text-field
          hide-details
          v-model="name"
          :outlined="edit"
          dense
        ></v-text-field>
      </v-col>
      <v-col class="d-flex pb-0" cols="12">
        <v-subheader class="px-0">Ngày sinh</v-subheader>
        <date-picker
          hide-details
          :date.sync="dob"
          :outlined="edit"
          dense
        ></date-picker>
      </v-col>
      <v-col class="d-flex pb-0" cols="12">
        <v-subheader class="px-0">Giới tính</v-subheader>
        <v-select
          v-model="gender"
          :items="genders"
          item-text="title"
          item-value="value"
          :outlined="edit"
          dense
          hide-details
        ></v-select>
      </v-col>
      <v-col class="d-flex pb-0" cols="12">
        <v-subheader class="px-0">Dân tộc</v-subheader>
        <v-text-field
          hide-details
          :outlined="edit"
          v-model="ethnic"
          dense
        ></v-text-field>
      </v-col>
      <v-col class="d-flex pb-0" cols="12">
        <v-subheader class="px-0">Địa chỉ thường trú</v-subheader>
        <v-text-field
          :outlined="edit"
          v-model="frequentlyAddress"
          dense
          hide-details
        ></v-text-field>
      </v-col>
    </v-row>
  </v-form>
</template>

<script>
import { mapActions } from 'vuex'
import DatePicker from '@/components/basic/picker/DateIOSPicker.vue'
import { moment } from 'moment'

export default {
  components: { DatePicker },
  props: {
    teacher: {
      type: [Object],
      default: () => {},
    },
    edit: Boolean,
  },
  data: () => ({
    valid: true,
    name: '',
    gender: '',
    dob: '',
    ethnic: '',
    frequentlyAddress: '',
    genders: [
      { title: 'Nam', value: 'male' },
      { title: 'Nữ', value: 'female' },
    ],
  }),
  created() {
    this.name = this.teacher.name
    this.gender = this.teacher.gender
    this.dob = moment(this.teacher.metadata.dob).format('DD/MM/YYYY')
    this.ethinic = this.teacher.metadata.ethinic
    this.frequentlyAddress = this.teacher.metadata.frequentAddress
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
}
</script>

<style scoped>
.v-subheader {
  width: 30%;
}
.hide-border fieldset {
  border-radius: 100px !important;
}
</style>
