<template>
  <v-form v-model="valid" ref="form" v-bind="this.$attrs">
    <v-row>
      <v-col class="pb-0" cols="12" md="6">
        <v-text-field
          v-model="name"
          label="Họ và tên"
          outlined
          class="required"
          dense
          @blur="nameLostFocus()"
          :rules="[rules.required]"
        ></v-text-field>
      </v-col>
      <v-col class="pb-0" cols="12" md="6">
        <autocomplete-class
          :rules="[rules.required]"
          v-model="classes"
          return-object
          label="Chọn lớp"
          outlined
          dense
          class="required"
        ></autocomplete-class>
      </v-col>
    </v-row>
    <v-row>
      <v-col class="pb-0" cols="12" md="6">
        <v-select
          v-model="gender"
          :items="genders"
          item-text="title"
          item-value="value"
          label="Giới Tính"
          dense
          outlined
        ></v-select>
      </v-col>
      <v-col class="pb-0" cols="12" md="6">
        <date-picker
          :date.sync="dob"
          v-model="dob"
          label="Ngày Sinh"
          dense
          outlined
          class="required"
          :rules="[rules.required, rules.dob]"
        ></date-picker>
      </v-col>
    </v-row>
    <v-row>
      <v-col class="pb-0" cols="12" md="6">
        <v-text-field
          v-model="frequentlyAddress"
          label="Quê quán"
          class="required"
          :rules="[rules.required]"
          outlined
          dense
        ></v-text-field>
      </v-col>
      <v-col class="pb-0" cols="12" md="6">
        <v-text-field
          v-model="ethnic"
          class="required"
          :rules="[rules.required]"
          label="Dân tộc"
          outlined
          dense
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row class="mx-1">
      <v-image-input
        :imageWidth="80"
        :imageHeight="80"
        v-model="imageData"
        :image-quality="0.85"
        clearable
        image-format="jpeg"
      />
    </v-row>
  </v-form>
</template>

<script>
// import { get } from 'lodash'
import DatePicker from '@/components/basic/picker/DateIOSPicker.vue'
import AutocompleteClass from '@/components/basic/input/AutocompleteClass'
import VImageInput from 'vuetify-image-input'
import { mapActions } from 'vuex'
import moment from 'moment'

export default {
  components: { DatePicker, AutocompleteClass, VImageInput },
  props: {
    student: {
      type: [Object],
      default: () => {},
    },
    rules: Object,
  },
  data: () => ({
    valid: true,
    imageData: '',
    name: '',
    username: '',
    username_indexing: '',
    username_no: '',
    gender: '',
    dob: '',
    ethnic: '',
    frequentlyAddress: '',
    classes: {},
    genders: [
      { title: 'Nam', value: 'male' },
      { title: 'Nữ', value: 'female' },
      { title: 'Khác', value: 'other' },
    ],
  }),
  created() {
    if (this.student) {
      this.name = this.student.name
      this.username = this.student.username
      this.gender = this.student.gender
      this.dob = moment(this.student.dob, 'YYYY-MM-DD').toISOString()
      this.ethnic = this.student.data.ethnic
      this.frequentlyAddress = this.student.data.frequentlyAddress
      this.classes = this.student.classes[0]
      console.log(this.student.dob)
      console.log(this.dob)
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
        username_no,
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
        username: this.username,
        user_indexing: this.username_indexing,
        username_no: this.username_no,
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
  },
}
</script>
