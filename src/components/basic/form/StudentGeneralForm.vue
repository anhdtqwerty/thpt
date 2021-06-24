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
        <RadioGender :defaultGender="gender" @change="gender = $event" mandatory />
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
    <v-row v-if="student" class="ma-2">
      <v-col class="d-flex align-center justify-center ml-3" cols="2">
        <UserAvatarPicker :user="student" type="student" />
      </v-col>
    </v-row>
    <v-row v-else class="my-4 mx-0">
      <div class="image-input" :style="{ 'background-image': `url(${imageData})` }" @click="chooseImage">
        <span v-if="!imageData" class="placeholder">
          Tải ảnh lên
        </span>
        <input
          class="file-input"
          ref="fileInput"
          type="file"
          accept="image/png, image/jpeg, image/bmp"
          @input="onChange"
        />
      </div>
      <v-btn icon v-if="imageData">
        <v-icon @click="removeImage" color="grey">close</v-icon>
      </v-btn>
    </v-row>
  </v-form>
</template>

<script>
// import { get } from 'lodash'
import DateIOSPicker from '@/components/basic/picker/DateIOSPicker.vue'
import { mapActions } from 'vuex'
import RadioGender from '@/modules/class/student/RadioGender.vue'
import UserAvatarPicker from '@/components/basic/picker/UserAvatarPicker'
import utils from '@/plugins/utils'
import { textHelpers } from '@/helpers/TextHelper.js'

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
    imageData: null,
    name: '',
    username: '',
    username_indexing: '',
    username_no: '',
    gender: 'male',
    dob: '',
    ethnic: '',
    frequentlyAddress: '',
    avatar: ''
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
      } = await this.generateStudentCode(this.studentName)
      this.username = username
      // eslint-disable-next-line
      this.username_indexing = username_indexing
      // eslint-disable-next-line
      this.username_no = username_no
    },
    chooseImage() {
      this.$refs.fileInput.click()
    },
    onChange() {
      const input = this.$refs.fileInput
      const files = input.files
      if (files && files[0]) {
        const reader = new FileReader()
        reader.onload = e => {
          this.imageData = e.target.result
        }
        reader.readAsDataURL(files[0])
        this.avatar = files[0]
      }
    },
    getData() {
      return {
        name: this.studentName,
        formatedName: utils.generateNameToSort(this.studentName),
        tags: utils.generateUserTags(this.studentName),
        username: this.username,
        user_indexing: this.username_indexing,
        username_no: this.username_no,
        gender: this.gender,
        dob: this.dob,
        ethnic: this.ethnic,
        frequentlyAddress: this.frequentlyAddress,
        avatar: this.avatar
      }
    },
    validate() {
      return this.$refs.form.validate()
    },
    reset() {
      this.$refs.form.reset()
      this.removeImage()
    },
    resetValidation() {
      this.$refs.form.resetValidation()
    },
    removeImage() {
      this.avatar = null
      this.imageData = null
    }
  },
  computed: {
    studentName() {
      return textHelpers.removeSpaces(this.name)
    }
  }
}
</script>
<style scoped>
.image-input {
  display: block;
  width: 200px;
  height: 200px;
  cursor: pointer;
  background-size: cover;
  background-position: center center;
}
.placeholder {
  background: #f0f0f0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #333;
  font-size: 18px;
  font-family: Helvetica;
}
.placeholder:hover {
  background: #e0e0e0;
}

.file-input {
  display: none;
}
</style>
