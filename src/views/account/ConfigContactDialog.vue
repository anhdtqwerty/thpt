<template>
  <div class="text-center">
    <v-dialog :fullscreen="$vuetify.breakpoint.smAndDown" max-width="620" v-model="dialog" scrollable>
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
                <CardStudentName :student="student" />
              </v-col>
              <v-col cols="2" class="pb-5">
                <div class="info-title">Ngày sinh</div>
                <div class="info-content mt-1">
                  {{ student | ddmmyyyy }}
                </div>
              </v-col>
              <v-col cols="2" class="pb-5">
                <div class="info-title">Mã số</div>
                <div class="info-content mt-1">
                  {{ (student.code || '') | getStudentCode }}
                </div>
              </v-col>
              <v-col cols="2" class="pb-5">
                <div class="info-title">Lớp</div>
                <div class="info-content mt-1">
                  {{ student.currentClass && student.currentClass.title }}
                </div>
              </v-col>
            </v-row>
            <v-row class="align-center py-4">
              <v-col cols="3"> Liên lạc qua <span class="error--text">*</span> </v-col>
              <v-col cols="9" class="d-flex">
                <v-checkbox class="mt-0 mr-6" v-model="isSms" label="SMS" disabled hide-details></v-checkbox>
                <v-checkbox class="mt-0" v-model="isApp" label="APP" hide-details></v-checkbox>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="3" class="pt-5"> SĐT đăng ký <span class="error--text">*</span></v-col>
              <v-col cols="6" class="pb-0">
                <div class="d-flex" v-for="index in getPhoneNumArray" :key="index">
                  <v-text-field
                    class="mr-2"
                    v-model="phones[index]"
                    placeholder="Nhập số điện thoại"
                    :rules="[$rules.vnPhone, $rules.required]"
                    outlined
                    dense
                  ></v-text-field>
                  <v-btn v-if="index === 0" disabled icon></v-btn>
                  <v-btn v-if="index > 0" style="margin-top: 2px" color="cancel" @click="removePhoneNumber(index)" icon
                    ><v-icon>mdi-close</v-icon></v-btn
                  >
                </div>
                <v-btn
                  color="primary"
                  class="text-none mb-4"
                  style="letter-spacing: 0.2px !important"
                  @click="addPhoneNumber()"
                  v-if="phoneNum < 5"
                  text
                  ><v-icon class="mr-2 ml-n4">mdi-plus</v-icon>Thêm số điện thoại</v-btn
                >
              </v-col>
            </v-row>
            <v-row class="d-flex" v-if="isSendPassword">
              <v-col cols="3" class="pt-5"> Mật khẩu APP <span class="error--text">*</span> </v-col>
              <v-col cols="6" class="d-flex pb-0">
                <v-text-field
                  v-model="password"
                  class="required mr-10"
                  :rules="[$rules.required, $rules.minLength(6), $rules.maxLength(12), $rules.nospace]"
                  label="Mật khẩu App"
                  outlined
                  dense
                ></v-text-field>
              </v-col>
            </v-row>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions class="d-flex justify-space-between py-4 px-5">
            <v-btn color="cancel" width="100px" @click="cancel" outlined>Huỷ</v-btn>
            <v-spacer></v-spacer>
            <v-btn color="primary" width="100px" class="elevation-0" @click="save">Lưu</v-btn>
          </v-card-actions>
        </v-card>
      </v-form>
    </v-dialog>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex'
import CardStudentName from '@/components/basic/card/CardStudentName.vue'
import { mask } from 'vue-the-mask'

export default {
  components: { CardStudentName },
  props: {
    student: {
      type: Object,
      default: () => {}
    },
    state: Boolean
  },
  directives: {
    mask
  },
  data() {
    return {
      dialog: false,
      phoneNum: 1,
      phones: [],
      isApp: false,
      isSms: true,
      password: this.$utils.autoGeneratePassword()
    }
  },
  computed: {
    ...mapState('students', ['studentSearchParams']),
    ...mapGetters('noti', ['sms']),
    ...mapGetters('app', ['roleIdByName', 'roles']),

    getPhoneNumArray() {
      return [...Array(this.phoneNum).keys()]
    },
    isSendPassword() {
      return this.isApp && !this.student.user
    },
    getPhones() {
      return this.phones.join(', ')
    }
  },
  methods: {
    ...mapActions('noti', ['sendEmail', 'sendSMS']),
    ...mapActions('auth', ['user']),
    ...mapActions('students', ['searchStudents', 'updateStudent']),
    ...mapActions('ContactBook', ['createContactBook', 'updateContactBook', 'createUser', 'removeUser']),

    addPhoneNumber() {
      if (this.phoneNum < 5) this.phoneNum++
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
      if (this.$refs.form.validate()) {
        if (this.isSendPassword) {
          // create user and send app's password
          this.$dialog.confirm({
            title: 'Xác nhận cài đặt',
            text: ` Hệ thống sẽ gửi tin nhắn thông báo thông tin tài khoản (để đăng nhập và sử dụng APP) tới số điện thoại đăng kí (${this.getPhones})
            Vui lòng kiểm tra lại thông tin và bấm xác nhận để tiếp tục.`,
            okText: 'Xác nhận',
            cancelText: 'Hủy',
            done: async () => {
              this.$loading.active = true
              if (await this.configContactBook()) {
                // create user
                await this.createAppAccount()
              }
              this.$loading.active = false
            }
          })
        } else {
          // config contact book
          this.$loading.active = true
          if (await this.configContactBook()) {
            this.$alert.success('Cài đặt thành công sổ liên lạc')
            this.dialog = false
          }
          this.$loading.active = false
        }
      }
    },
    async configContactBook() {
      try {
        const phones = this.phones.join(', ')
        if (this.student.contactBook) {
          await this.updateContactBook({
            id: this.student.contactBook.id,
            isApp: this.isApp,
            isSms: this.isSms,
            phones
          })
        } else {
          await this.createContactBook({
            student: this.student.id,
            status: 'active',
            isApp: this.isApp,
            isSms: this.isSms,
            phones
          })
        }
        await this.searchStudents({ ...this.studentSearchParams })
        return true
      } catch (error) {
        this.$alert.error('Cài đặt liên lạc thất bại')
        return false
      }
    },
    async createAppAccount() {
      let user = {}
      try {
        user = await this.createUser({
          student: this.student.id,
          username: this.student.code,
          username_no: this.student.data.username_no,
          password: this.password,
          type: 'student',
          role: this.roleIdByName('Student'),
          email: this.student.email,
          department: this.student.department.id,
          status: 'active'
        })

        await this.updateStudent({
          id: this.student.id,
          user: user.id
        })
        this.$alert.success('Cài đặt thành công sổ liên lạc')
        this.dialog = false
      } catch (error) {
        this.removeUser(user.id)
        this.$alert.error('Tạo tài khoản App thất bại')
      }
    },
    reset() {
      this.phones = []
      this.password = this.$utils.autoGeneratePassword()
      this.isApp = false
      this.dialog = false
    }
  },
  filters: {},
  watch: {
    state(state) {
      this.dialog = true
    },
    student(student) {
      if (student.contactBook) {
        this.phoneNum = student.contactBook.phones.split(',').length
        this.isSms = student.contactBook.isSms
        this.isApp = student.contactBook.isApp
        const phones = student.contactBook.phones.split(',')
        this.phones = phones.map(p => p.trim())
      }
    }
  }
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
