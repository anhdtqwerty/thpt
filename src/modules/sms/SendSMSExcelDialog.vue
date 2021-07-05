<template>
  <div class="text-center">
    <v-dialog :fullscreen="$vuetify.breakpoint.smAndDown" max-width="1000" v-model="dialog" scrollable>
      <v-card>
        <v-card-title class="primary white--text">
          Gửi tin nhắn theo tệp Excel <v-spacer></v-spacer>
          <v-btn dark icon>
            <v-icon @click="cancel">close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text>
          <div
            class="d-flex flex-column justify-center align-center mx-auto"
            style="width: 330px; min-height: 320px"
            v-if="step === 'import'"
          >
            <v-img max-width="100px" max-height="100px" contain src="../../assets/upload-file.svg"></v-img>
            <div class="text-center content-text mt-5" @click="exportExcelTemplate">
              Tải tệp excel tin nhắn để gửi tin nhắn theo danh sách sẵn có
            </div>
            <div class="mt-5">
              <v-btn color="primary" class="mr-5" @click="exportExcelTemplate" outlined>Tải mẫu nhập</v-btn>
              <v-btn color="primary" class="elevation-0" :loading="isSelecting" @click="onExcelUpload">
                <span>Chọn tệp</span>
                <input
                  ref="uploader"
                  type="file"
                  class="d-none"
                  accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                  @change="onFileChanged"
                />
              </v-btn>
            </div>
          </div>
          <div class="pa-5" style="height: 100%" v-else-if="step === 'send'">
            <div class="d-flex align-center">
              <v-text-field
                v-model="selectedFile.name"
                outlined
                prepend-inner-icon="mdi-file"
                disabled
                hide-details
              ></v-text-field>
              <v-btn color="primary" @click="cancelChooseFile" text>Chọn tệp khác</v-btn>
            </div>
            <v-data-table
              class="mt-4"
              mobile-breakpoint="0"
              item-key="studentCode"
              :headers="originHeaders"
              :items="excelSMSs"
              sort-by="name"
              :footer-props="{
                'items-per-page-text': 'Hiển thị mỗi trang',
                'items-per-page-all-text': 'Tất cả'
              }"
            >
              <template v-slot:[`footer.page-text`]="items">
                {{ items.pageStart }} - {{ items.pageStop }} trên
                {{ items.itemsLength }}
              </template>
              <template v-slot:[`item.studentCode`]="{ item }">
                {{ item.studentCode }}
              </template>
              <template v-slot:[`item.studentName`]="{ item }">
                {{ item.studentName }}
              </template>
              <template v-slot:[`item.studentClass`]="{ item }">
                {{ item.studentClass }}
              </template>
              <template v-slot:[`item.msgContent`]="{ item }">
                {{ item.msgContent }}
              </template>
            </v-data-table>
          </div>
          <div v-else>
            <div class="mt-2">Lỗi gửi tin</div>
            <div>
              Đã có {{ errorSMSs.length }} tin nhắn trong tệp excel gặp lỗi trong quá trình gửi tin tới người nhận do
              thông tin số điện thoại chưa đúng hoặc mất tín hiệu kết nối.
            </div>
            <div>Các học sinh chưa nhận được tin nhắn</div>
            <v-data-table
              class="mt-4"
              mobile-breakpoint="0"
              item-key="studentCode"
              :headers="errorHeaders"
              :items="errorSMSs"
              sort-by="name"
              :footer-props="{
                'items-per-page-text': 'Hiển thị mỗi trang',
                'items-per-page-all-text': 'Tất cả'
              }"
            >
              <template v-slot:[`footer.page-text`]="items">
                {{ items.pageStart }} - {{ items.pageStop }} trên tổng
                {{ items.itemsLength }}
              </template>
              <template v-slot:[`item.index`]="{ item }">
                {{ errorSMSs.indexOf(item) + 1 }}
              </template>
              <template v-slot:[`item.studentName`]="{ item }">
                {{ item.student.name }}
              </template>
              <template v-slot:[`item.studentCode`]="{ item }">
                {{ item.student.code | getStudentCode }}
              </template>
              <template v-slot:[`item.studentClass`]="{ item }">
                {{ item.class.title }}
              </template>
            </v-data-table>
            <div>Để gửi lại tin nhắn bị lỗi, vui lòng bấm nút gửi lại</div>
          </div>
        </v-card-text>

        <v-card-actions v-if="excelSMSs.length > 0">
          <div class="d-flex justify-space-between align-center" style="width: 100%" v-if="step === 'send'">
            <v-btn color="gray" class="ma-2 px-8" @click="cancel" outlined>Hủy</v-btn>
            <v-btn color="primary" class="elevation-0 px-8" @click="sendExcelSMSs">Gửi</v-btn>
          </div>
          <div class="d-flex justify-space-between align-center" style="width: 100%" v-else>
            <v-btn color="gray" class="ma-2 px-8" @click="errorCancel" outlined>Hủy</v-btn>
            <v-btn color="primary" class="elevation-0 px-8" @click="resendSMSs">Gửi lại</v-btn>
          </div>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import readXlsxFile from 'read-excel-file'
import { Post, Student, ContactBook, History } from '@/plugins/api'
import { chunk } from 'lodash'
import utils from '@/plugins/utils'

const schema = {
  'MS học sinh': {
    prop: 'studentCode',
    type: String
  },
  'Tên học sinh': {
    prop: 'studentName',
    type: String
  },
  Lớp: {
    prop: 'studentClass',
    type: String
  },
  'Nội dung': {
    prop: 'msgContent',
    type: String
  }
}
export default {
  components: {},
  props: {
    state: Boolean
  },
  data() {
    return {
      dialog: false,
      progress: 1,
      isSelecting: false,
      selectedFile: null,
      excelSMSs: [],
      errorSMSs: [],
      step: 'import',
      originHeaders: [
        {
          text: 'Mã số',
          value: 'studentCode',
          align: 'left',
          sortable: false,
          show: true
        },
        {
          text: 'Tên học sinh',
          value: 'studentName',
          align: 'left',
          sortable: false,
          show: true
        },
        {
          text: 'Lớp',
          value: 'studentClass',
          align: 'left',
          sortable: false,
          show: true,
          width: 100
        },
        {
          text: 'Nội dung tin',
          value: 'msgContent',
          align: 'left',
          sortable: false,
          show: true
        }
      ],
      errorHeaders: [
        {
          text: 'STT',
          value: 'index',
          align: 'left',
          sortable: false
        },
        {
          text: 'Mã số',
          value: 'studentCode',
          align: 'left',
          sortable: false,
          show: true
        },
        {
          text: 'Tên học sinh',
          value: 'studentName',
          align: 'left',
          sortable: false,
          show: true
        },
        {
          text: 'Lớp',
          value: 'studentClass',
          align: 'left',
          sortable: false,
          show: true
        }
      ]
    }
  },
  computed: {
    ...mapGetters('noti', ['sms']),
    ...mapGetters('auth', ['profile'])
  },
  methods: {
    ...mapActions('noti', ['sendEmail', 'sendSMS']),
    ...mapActions('auth', ['user']),
    send() {},
    cancel() {
      this.dialog = false
      this.reset()
    },
    reset() {
      this.errorSMSs = []
      this.excelSMSs = []
      this.selectedFile = null
      this.step = 'import'
    },
    cancelChooseFile() {
      this.step = 'import'
      this.selectedFile = null
      this.excelSMSs = []
    },
    onExcelUpload() {
      this.isSelecting = true
      window.addEventListener(
        'focus',
        () => {
          this.isSelecting = false
        },
        { once: true }
      )

      this.$refs.uploader.click()
    },
    async onFileChanged(e) {
      this.$loading.active = true
      this.selectedFile = e.target.files[0]
      let readFileResult
      try {
        readFileResult = await readXlsxFile(this.selectedFile, {
          schema
        })
      } catch (error) {
        this.$alert.error('File không có định dạng .xlsx hoặc có dữ liệu không hợp lệ (tham khảo mẫu file)')
        this.$loading.active = false
        return
      }
      if (readFileResult.errors.length !== 0) {
        const error = readFileResult.errors[0]
        this.$alert.error(`Lỗi Dòng ${error.row} - Cột ${error.column} - ${error.value}: ${error.error}`)
        this.$loading.active = false
        return
      } else {
        const results = readFileResult.rows
        this.step = 'send'
        this.excelSMSs = results
      }
      this.$loading.active = false
    },
    async exportExcelTemplate() {
      this.$loading.active = true
      window.location.href = `${this.$baseUrl}sms.xlsx`
      this.$loading.active = false
    },
    async sendExcelSMSs() {
      this.$loading.active = true
      const groups = chunk(this.excelSMSs, 10)
      let posts = []
      for (let students of groups) {
        posts = [
          ...posts,
          ...(await Promise.all(
            students.map(async student => {
              const studentInfo = await Student.fetch({ code_contains: student.studentCode, _limit: 1 })
              const params = {
                staff: this.profile.id,
                content: student.msgContent,
                keywords: utils.clearUnicode(student.msgContent),
                type: 'other',
                senderMethod: 'sms',
                config: 'immediately'
              }
              return Post.create({ ...params, student: studentInfo[0].id })
            })
          ))
        ]
      }
      this.errorSMSs = await History.fetch({ post: { $in: posts.map(p => p.id) }, status: 'error' })
      if (this.errorSMSs.length === 0) {
        this.$alert.success('Đã gửi tin nhắn, xem chi tiết tại màn hình lịch sử gửi tin')
        this.cancel()
      }
      this.step = 'noti'
      this.$loading.active = false
    },
    async resendSMSs() {
      this.$loading.active = true
      const groups = chunk(this.errorSMSs, 10)
      let histories = []
      try {
        for (let historyPosts of groups) {
          histories = [
            ...histories,
            ...(await Promise.all(
              historyPosts.map(async history => {
                return ContactBook.resend(history.id)
              })
            ))
          ]
        }
        this.errorSMSs = await History.fetch({ post: { $in: histories.map(p => p.id) }, status: 'error' })
        if (this.errorSMSs.length === 0) {
          this.$alert.success('Đã gửi tin nhắn, xem chi tiết tại màn hình lịch sử gửi tin')
          this.cancel()
        }
      } catch (error) {
        this.$alert.error('Gửi tin nhắn thất bại!, Lỗi: ', error)
      } finally {
        this.$loading.active = false
      }
    },
    errorCancel() {
      this.cancel()
      this.$alert.errors(
        'Tồn tại các tin nhắn bị lỗi chưa được gửi đi. Vui lòng kiểm tra các tin lỗi này tại trang [Lịch sử gửi tin]!'
      )
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
</style>
