<template>
  <v-form ref="form" v-bind="this.$attrs">
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
        />
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
        />
      </v-col>
      <v-col class="pb-0" cols="12" md="6">
        <v-text-field v-model="ethnic" label="Dân tộc" outlined dense class="required" :rules="[$rules.required]" />
      </v-col>
    </v-row>
    <v-row v-if="teacher" class="ma-2">
      <v-col class="d-flex align-center justify-center ml-3" cols="2">
        <UserAvatarPicker :user="teacher" type="teacher" />
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
import DateIOSPicker from '@/components/basic/picker/DateIOSPicker.vue'
import { mapActions } from 'vuex'
import RadioGender from '@/components/basic/RadioGender.vue'
import UserAvatarPicker from '@/components/basic/picker/UserAvatarPicker'
import { textHelpers } from '@/helpers/TextHelper.js'
import { get } from 'lodash'

export default {
  components: { DateIOSPicker, RadioGender, UserAvatarPicker },
  props: {
    teacher: Object,
    formState: Boolean
  },
  data: () => ({
    username: '',
    username_indexing: '',
    username_no: '',
    name: '',
    dob: '',
    ethnic: '',
    frequentlyAddress: '',
    gender: 'male',
    avatar: '',
    imageData: null
  }),
  computed: {
    teacherName() {
      return textHelpers.removeSpaces(this.name)
    }
  },
  created() {
    this.initData()
  },
  methods: {
    initData() {
      if (this.teacher) {
        this.name = this.teacher.name
        this.username = this.teacher.username
        this.gender = this.teacher.gender
        this.dob = this.teacher.dob
        this.ethnic = get(this.teacher, 'metadata.ethnic')
        this.frequentlyAddress = get(this.teacher, 'metadata.frequentlyAddress')
      }
    },
    ...mapActions('user', ['generateUserName', 'validateEmail']),
    async nameLostFocus() {
      const {
        username,
        // eslint-disable-next-line
        username_indexing,
        // eslint-disable-next-line
        username_no
      } = await this.generateUserName(this.name)
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
        name: this.teacherName,
        gender: this.gender,
        dob: this.dob,
        ethnic: this.ethnic,
        frequentlyAddress: this.frequentlyAddress,
        username: this.username,
        username_indexing: this.username_indexing,
        username_no: this.username_no,
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
  watch: {
    formState(formState) {
      if (!formState) {
        this.initData()
      }
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
