<template>
  <div class="text-center">
    <v-dialog
      :fullscreen="$vuetify.breakpoint.smAndDown"
      max-width="620"
      v-model="dialog"
      scrollable
    >
      <v-form ref="form">
        <v-card height="590px">
          <v-card-title class="primary white--text">
            Cài đặt hình thức liên lạc <v-spacer></v-spacer>
            <v-btn dark icon>
              <v-icon @click="cancel">close</v-icon>
            </v-btn>
          </v-card-title>
          <v-card-text class="pa-5">
            <v-row class="d-flex align-end pa-0">
              <v-col cols="6" class="py-0 my-1">
                <div class="info-title">Học sinh</div>
                <card-student-name :student="student" link />
              </v-col>
              <v-col cols="2" class="pb-5">
                <div class="info-title">Ngày sinh</div>
                <div class="info-content mt-1">
                  {{ student | getStudentDob }}
                </div>
              </v-col>
              <v-col cols="2" class="pb-5">
                <div class="info-title">Mã số</div>
                <div class="info-content mt-1">
                  {{ student | getStudentCode }}
                </div>
              </v-col>
              <v-col cols="2" class="pb-5">
                <div class="info-title">Lớp</div>
                <div class="info-content mt-1">
                  {{ student | getClassTitle }}
                </div>
              </v-col>
            </v-row>
            <v-row class="align-center py-4">
              <v-col cols="3">
                Liên lạc qua <span class="error--text">*</span>
              </v-col>
              <v-col cols="9" class="d-flex">
                <v-checkbox
                  class="mt-0 mr-6"
                  v-model="isSms"
                  label="SMS"
                  disabled
                  hide-details
                ></v-checkbox>
                <v-checkbox
                  class="mt-0"
                  v-model="isApp"
                  label="APP"
                  hide-details
                ></v-checkbox>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="3" class="pt-5">
                SĐT đăng ký <span class="error--text">*</span></v-col
              >
              <v-col cols="6" class="pb-0">
                <div
                  class="d-flex"
                  v-for="index in getPhoneNumArray"
                  :key="index"
                >
                  <v-text-field
                    class="mr-2"
                    v-model="phones[index]"
                    placeholder="Nhập số điện thoại"
                    :rules="[$rules.vnPhone, $rules.required]"
                    outlined
                    dense
                  ></v-text-field>
                  <v-btn v-if="index === 0" disabled icon></v-btn>
                  <v-btn
                    v-if="index > 0"
                    style="margin-top: 2px"
                    color="cancel"
                    @click="removePhoneNumber(index)"
                    icon
                    ><v-icon>mdi-close</v-icon></v-btn
                  >
                </div>
                <v-btn
                  color="primary"
                  class="text-none mb-4"
                  style="letter-spacing: 0.2px !important"
                  @click="addPhoneNumber()"
                  v-if="phoneNum < 4"
                  text
                  ><v-icon class="mr-2 ml-n4">mdi-plus</v-icon>Thêm số điện
                  thoại</v-btn
                >
              </v-col>
            </v-row>
            <!-- <v-row v-if="isApp">
              <v-col cols="3" class="pt-5">
                Mật khẩu App <span class="error--text">*</span>
              </v-col>
              <v-col cols="6">
                <div class="d-flex">
                  <v-text-field
                    v-model="password"
                    v-mask="'###########'"
                    placeholder="Nhập mật khẩu APP"
                    :rules="[
                      $rules.required,
                      $rules.minLength(6),
                      $rules.maxLength(12),
                    ]"
                    outlined
                    dense
                  ></v-text-field>
                  <v-btn disabled icon></v-btn>
                </div>
              </v-col>
            </v-row> -->
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions class="d-flex justify-space-between py-4 px-5">
            <v-btn color="cancel" width="100px" @click="cancel" outlined
              >Huỷ</v-btn
            >
            <v-spacer></v-spacer>
            <v-btn
              color="primary"
              width="100px"
              class="elevation-0"
              @click="save()"
              >Lưu</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-form>
    </v-dialog>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import moment from 'moment'
import { get } from 'lodash'
import CardStudentName from '@/components/basic/card/CardStudentName.vue'
import { mask } from 'vue-the-mask'

export default {
  components: { CardStudentName },
  props: {
    student: {
      type: Object,
      default: () => {},
    },
    state: Boolean,
  },
  directives: {
    mask,
  },
  data() {
    return {
      dialog: false,
      phoneNum: 1,
      phones: [],
      isApp: false,
      isSms: true,
      // password: this.$utils.autoGeneratePassword(),
    }
  },
  computed: {
    ...mapGetters('noti', ['sms']),
    getPhoneNumArray() {
      return [...Array(this.phoneNum).keys()]
    },
  },
  methods: {
    ...mapActions('noti', ['sendEmail', 'sendSMS']),
    ...mapActions('auth', ['user']),
    ...mapActions('students', ['updateStudent']),
    ...mapActions('user', ['updateUser']),
    addPhoneNumber() {
      if (this.phoneNum < 4) this.phoneNum++
    },
    removePhoneNumber(index) {
      this.phones.splice(index, 1)
      if (this.phoneNum > 1) this.phoneNum--
    },
    cancel() {
      this.dialog = false
      this.reset()
    },
    async save() {
      try {
        if (this.$refs.form.validate()) {
          await this.updateStudent({
            id: this.student.id,
            contact: {
              ...this.student.contact,
              isSms: this.isSms,
              isApp: this.isApp,
              phones: this.phones,
            },
          })
          // if (this.isApp && this.password)
          //   await this.updateUser({
          //     id: this.student.user.id,
          //     password: this.password,
          //   })
          this.$alert.success('Cài đặt thành công sổ liên lạc')
          this.dialog = false
        }
      } catch (error) {
        this.$alert.error(error)
      }
    },
    reset() {
      this.phones = []
      // this.password = this.$utils.autoGeneratePassword()
      this.isApp = false
      this.dialog = false
    },
  },
  filters: {
    getStudentDob: (student) => {
      if (student.dob) return moment.utc(student.dob).format('DD/MM/YYYY')
      return ''
    },
    getStudentCode: (student) => {
      return get(student, 'code', '')
    },
    getClassTitle: (student) => {
      return get(student, 'classes[0].title', '')
    },
  },
  watch: {
    state(state) {
      this.dialog = state
    },
    dialog(dialog) {
      if (!dialog) this.$emit('close')
    },
    student(student) {
      if (student.contact) {
        this.phoneNum = student.contact.phones.length
        this.isSms = student.contact.isSms
        this.isApp = student.contact.isApp
        this.phones = student.contact.phones
      }
    },
  },
}
</script>

<style scoped>
.send-sms-container td:nth-child(1) {
  font-weight: bold;
  text-align: end;
  vertical-align: top;
}
.send-sms-container td:nth-child(2) {
  padding-left: 50px;
}
tr.spaceUnder > td {
  padding-bottom: 30px;
}
.info-title {
  font-style: normal;
  font-weight: normal;
  font-size: 11px;
  line-height: 13px;
  color: #757575;
}
.info-content {
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 16.5px;
  color: black;
}
</style>
