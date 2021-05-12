<template>
  <v-form v-model="valid" ref="form" v-bind="this.$attrs">
    <v-row>
      <v-col class="pb-0" cols="12" md="6">
        <v-text-field
          v-model="name"
          label="Họ tên"
          outlined
          class="required"
          dense
          @blur="nameLostFocus()"
          :rules="[$rules.required]"
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col class="pb-0" cols="12" md="6">
        <DateIOSPicker
          :date.sync="dob"
          label="Ngày sinh"
          dense
          outlined
          class="required"
          :rules="[$rules.required, $rules.date]"
        />
      </v-col>
      <v-col class="pb-0" cols="12" md="6">
        <RadioGender :defaultGender="gender" @change="gender = $event" />
      </v-col>
    </v-row>
    <v-row>
      <v-col class="pb-0" cols="12" md="6">
        <v-text-field
          v-model="frequentlyAddress"
          label="Quê quán"
          outlined
          dense
          class="required"
          :rules="[$rules.required]"
        ></v-text-field>
      </v-col>
      <v-col class="pb-0" cols="12" md="6">
        <v-text-field
          v-model="ethnic"
          label="Dân tộc"
          outlined
          dense
          class="required"
          :rules="[$rules.required]"
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row class="ma-2">
      <v-col class="d-flex align-center justify-center ml-3" cols="2">
        <UserAvatarPicker :student="student" type="student" />
      </v-col>
    </v-row>
  </v-form>
</template>

<script>
// import { get } from 'lodash'
import DateIOSPicker from '@/components/basic/picker/DateIOSPicker.vue'
import { mapActions } from 'vuex'
import RadioGender from '@/modules/class/student/RadioGender.vue'
import UserAvatarPicker from '@/components/basic/picker/UserAvatarPicker'

export default {
  components: { DateIOSPicker, RadioGender, UserAvatarPicker },
  props: {
    student: {
      type: [Object],
      default: () => {}
    },
    rules: Object
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
    frequentlyAddress: ''
  }),
  created() {
    if (this.student) {
      this.name = this.student.name
      this.username = this.student.username
      this.gender = this.student.gender
      this.dob = this.student.dob
      this.ethnic = this.student.data.ethnic
      this.frequentlyAddress = this.student.data.frequentlyAddress
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
        username: this.username,
        user_indexing: this.username_indexing,
        username_no: this.username_no,
        gender: this.gender,
        dob: this.dob,
        ethnic: this.ethnic,
        frequentlyAddress: this.frequentlyAddress
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
    }
  }
}
</script>
