<template>
  <div class="text-center">
    <v-dialog :fullscreen="$vuetify.breakpoint.smAndDown" max-width="720" v-model="dialog" scrollable>
      <v-form ref="form">
        <v-card height="350px">
          <v-card-title class="primary white--text">
            Cài đặt mật khẩu sử dụng APP<v-spacer></v-spacer>
            <v-btn dark icon>
              <v-icon @click="cancel">close</v-icon>
            </v-btn>
          </v-card-title>
          <v-card-text class="px-5 pt-7">
            <v-row class="d-flex align-end pa-0">
              <v-col cols="6" class="py-0 my-1">
                <div class="info-title">Học sinh</div>
                <card-student-name :student="student" link />
              </v-col>
              <v-col cols="2" class="pb-5">
                <div class="info-title">Ngày sinh</div>
                <div class="info-content mt-1">
                  {{ student.dob | ddmmyyyy }}
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
                  {{ student | getClassTitle }}
                </div>
              </v-col>
            </v-row>
            <v-row class="pt-4">
              <v-col cols="3" class="mt-2"> Mật khẩu mới <span class="error--text">*</span> </v-col>
              <v-col cols="9" class="d-flex">
                <div class="d-flex">
                  <v-text-field
                    v-model="password"
                    placeholder="Nhập mật khẩu APP"
                    :rules="[$rules.required, $rules.minLength(6), $rules.maxLength(12), $rules.nospace]"
                    outlined
                    dense
                  ></v-text-field>
                  <v-btn disabled icon></v-btn>
                </div>
              </v-col>
            </v-row>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions class="d-flex justify-space-between py-4 px-5">
            <v-btn color="cancel" width="100px" @click="cancel" outlined>Huỷ</v-btn>
            <v-spacer></v-spacer>
            <v-btn color="primary" width="100px" class="elevation-0" @click="save()">Lưu</v-btn>
          </v-card-actions>
        </v-card>
      </v-form>
    </v-dialog>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { get } from 'lodash'
import CardStudentName from '@/components/basic/card/CardStudentName.vue'
import { mask } from 'vue-the-mask'
import { Post } from '@/plugins/api'
import utils from '@/plugins/utils'

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
      password: ''
    }
  },
  computed: {
    ...mapGetters('noti', ['sms']),
    ...mapGetters('auth', ['profile']),

    getPhoneNumArray() {
      return [...Array(this.phoneNum).keys()]
    }
  },
  methods: {
    ...mapActions('noti', ['sendEmail', 'sendSMS']),
    ...mapActions('auth', ['user']),
    ...mapActions('students', ['updateStudent']),
    ...mapActions('user', ['updateUser']),

    cancel() {
      this.dialog = false
      this.reset()
    },
    async save() {
      if (this.$refs.form.validate()) {
        this.$dialog.confirm({
          title: 'Xác nhận cài đặt',
          text: ` Hệ thống sẽ gửi tin nhắn thông báo thông tin tài khoản (để đăng nhập và sử dụng APP) tới số điện thoại đăng kí (${this.getPhones})
            Vui lòng kiểm tra lại thông tin và bấm xác nhận để tiếp tục.`,
          okText: 'Xác nhận',
          cancelText: 'Hủy',
          done: async () => {
            try {
              this.$loading.active = true
              await this.updateUser({
                id: this.student.user.id,
                password: this.password
              })

              const content = `Tai khoan dang nhap APP so lien lac dien tu cua hoc sinh ${this.student.name}, Tai khoan: ${this.student.user.username}, mat khau: ${this.password}`
              const post = {
                student: this.student.id,
                senderMethod: 'sms',
                type: 'other',
                content,
                keywords: utils.clearUnicode(content),
                staff: this.profile.id
              }
              await Post.create(post)

              this.$alert.success(
                'Cài đặt mật khẩu mới thành công, xem chi tiết tin nhắn đã gửi tại màn hình lịch sử gửi tin'
              )
              this.dialog = false
            } catch (error) {
              this.$alert.error('Cập nhật mật khẩu thất bại')
            } finally {
              this.$loading.active = false
            }
          }
        })
      }
    },
    reset() {
      this.password = ''
      this.dialog = false
      this.$refs.form.resetValidation()
    }
  },
  filters: {
    getClassTitle: student => {
      return get(student, 'currentClass.title', '')
    }
  },
  watch: {
    state(state) {
      this.dialog = true
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
