<template>
  <div class="text-center">
    <v-dialog
      :fullscreen="$vuetify.breakpoint.smAndDown"
      max-width="1000"
      v-model="dialog"
      scrollable
    >
      <v-card height="600px">
        <v-card-title class="primary white--text">
          Gửi tin nhắn theo tệp Excel <v-spacer></v-spacer>
          <v-btn dark icon>
            <v-icon @click="cancel">close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text class="d-flex flex-column justify-center pa-0">
          <div
            class="d-flex flex-column justify-center align-center mx-auto"
            style="width: 330px"
          >
            <v-img width="100" src="../../assets/upload-file.svg"></v-img>
            <div
              class="text-center content-text mt-5"
              @click="exportExcelTemplate"
            >
              Tải tệp excel tin nhắn để gửi tin nhắn theo danh sách sẵn có
            </div>
            <div class="mt-5">
              <v-btn color="primary" class="mr-5" outlined>Tải mẫu nhập</v-btn>
              <v-btn
                color="primary"
                class="elevation-0"
                :loading="isSelecting"
                @click="onExcelUpload"
              >
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
        </v-card-text>
        <v-card-actions></v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import readXlsxFile from 'read-excel-file'

const schema = {
  'Mã số': {
    prop: 'studentCode',
    type: String,
  },
  'Tên học sinh': {
    prop: 'studentName',
    type: String,
  },
  Lớp: {
    prop: 'studentClass',
    type: String,
  },
  'Nội dung tin': {
    prop: 'msg',
    type: String,
  },
}
export default {
  components: {},
  props: {
    data: { type: Array, required: true, default: () => [] },
    state: Boolean,
  },
  data() {
    return {
      dialog: false,
      progress: 1,
      isSelecting: false,
      selectedFile: null,
      excelSMSs: [],
      confirmResultDialog: false,
    }
  },
  computed: {
    ...mapGetters('noti', ['sms']),
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
      this.subject = ''
      this.text = ''
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
          schema,
        })
      } catch (error) {
        this.$alert.error(
          'File không có định dạng .xlsx hoặc có dữ liệu không hợp lệ (tham khảo mẫu file)'
        )
        this.$loading.active = false
        return
      }
      if (readFileResult.errors.length !== 0) {
        const error = readFileResult.errors[0]
        this.$alert.error(
          `Lỗi Dòng ${error.row} - Cột ${error.column} - ${error.value}: ${error.error}`
        )
        this.$loading.active = false
        return
      } else {
        const results = readFileResult.rows
        this.importedDocuments = results
        this.confirmResultDialog = true
      }
      this.$loading.active = false
    },
    async exportExcelTemplate() {
      this.$loading.active = true
      window.location.href = `${this.$baseUrl}sms.xlsx`
      this.$loading.active = false
    },
  },
  watch: {
    state(state) {
      this.dialog = true
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
</style>
