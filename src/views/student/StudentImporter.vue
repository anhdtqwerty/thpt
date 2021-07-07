<template>
  <v-card class="ma-2">
    <v-card-title flex>
      <v-file-input
        show-size
        label="Chọn File"
        @change="onFileSelected"
        :value="value"
        :disabled="isLoading"
        append-icon="file"
        style="max-width:300px"
      ></v-file-input>
      <v-btn depressed color="primary" @click="upload" :disabled="isLoading || loading" dark>Lưu lại</v-btn>
    </v-card-title>
    <v-data-table
      class="mb-2 flex-center-between"
      style="flex-direction: row-reverse;"
      :headers="headers"
      :items="students"
      :search="search"
    >
      <template v-slot:[`item.grade`]="{ item }">
        <router-link v-if="item.grade" :to="'/grade/' + item.grade.id">
          <v-tooltip top>
            <template v-slot:activator="{ on }">
              <span v-on="on">{{ item.grade }}</span>
            </template>
            <span>{{ item.grade }}</span>
          </v-tooltip>
        </router-link>
      </template>
      <template v-slot:[`item.classes`]="{ item }">
        <span>{{ item.classes | getClasses }}</span>
      </template>
      <template v-slot:[`item.generation`]="{ item }">
        <router-link v-if="item.generation" :to="'/generation/' + item.generation">
          <v-tooltip top>
            <template v-slot:activator="{ on }">
              <span v-on="on">{{ item.generation }}</span>
            </template>
            <span>{{ item.generation }}</span>
          </v-tooltip>
        </router-link>
      </template>
      <template v-slot:[`item.uploadStatus`]="{ item }">
        <v-chip small dark :color="getColor(item.uploadStatus)">{{ item.uploadStatus | getStatus }}</v-chip>
      </template>
      <template v-slot:[`item.dob`]="{ item }">{{ item.dob | familiarizeDate }}</template>
    </v-data-table>
  </v-card>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { get } from 'lodash'
import utils from '@/plugins/utils'
import XLSX from 'xlsx'
import moment from 'moment'
export default {
  components: {},
  data() {
    return {
      search: '',
      dialog: false,
      selectedStudent: {},
      migratedStudents: [],
      value: null,
      isLoading: true,
      headers: [
        {
          text: 'Upload Status',
          value: 'uploadStatus',
          align: 'left',
          sortable: false
        },
        { text: 'Tên Học Sinh', value: 'name' },
        { text: 'Code', value: 'username' },
        { text: 'Lớp', value: 'classes' },
        { text: 'Email', value: 'email' },
        { text: 'phone', value: 'phone' },
        { text: 'Giới Tính', value: 'gender' },
        { text: 'Địa Chỉ', value: 'address' },
        { text: 'Facebook', value: 'facebook' },
        { text: 'Năm Sinh', value: 'dob' },
        { text: 'Mật Khẩu', value: 'password' },
        { text: 'Khối', value: 'grade' },
        { text: 'Khóa', value: 'generation' }
      ]
    }
  },
  computed: {
    ...mapGetters('app', ['department']),
    ...mapGetters('studentImporter', ['students', 'loading', 'grade', 'classes', 'generations']),
    ...mapGetters('app', ['roleIdByName', 'roles']),
    isProcessing() {
      return this.loading || this.isLoading
    }
  },
  async created() {
    this.isLoading = true
    await this.fetchGenerations({ department: this.department.id })
    await this.fetchClasses({ department: this.department.id })
    this.isLoading = false
  },
  methods: {
    ...mapActions('studentImporter', [
      'fetchGenerations',
      'fetchClasses',
      'fetchMajors',
      'setStudents',
      'setStudent',
      'migrateStudents',
      'validateStudents'
    ]),
    ...mapActions('user', ['validateEmail']),
    onFileSelected(file) {
      let self = this
      let reader = new FileReader()
      reader.onload = function(e) {
        var data = new Uint8Array(e.target.result)
        var workbook = XLSX.read(data, { type: 'array' })
        let sheetName = workbook.SheetNames[0]
        let worksheet = workbook.Sheets[sheetName]
        let students = XLSX.utils.sheet_to_json(worksheet)

        self.setStudents(
          students.map((student, index) => {
            const code = parseInt(student.code)
            const indexName = utils.generateUserName(utils.clearUnicode(student.name))
            const studentClass = self.classes[student.classes]
            return {
              ...self.$utils.filterObject(student),
              dob: moment(student.dob, 'DD/MM/YYYY').toISOString(),
              username: `${indexName}${student.code}`,
              username_indexing: indexName,
              username_no: code,
              email: `${indexName}${student.code}@ltvhn.edu.vn`,
              key: index,
              phone: student.phone | '',
              department: self.department.id,
              classes: [studentClass],
              currentClass: studentClass,
              grade: get(studentClass, 'grade.id'),
              generation: get(studentClass, 'generation.id'),
              // generation: student.generation.id,
              uploadStatus: 'validate',
              address: student.frequentlyAddress,
              status: 'active',
              tags: student.tags,
              password: '123123',
              role: self.roleIdByName('Student'),
              data: {
                frequentlyAddress: student.frequentlyAddress,
                currentLive: student.currentLive,
                birthPlace: this.birthPlace,
                achievements: this.achievements,
                facebook: student.facebook,
                address: student.address,
                university: student.university,
                company: student.company,
                highSchool: student.highSchool,
                dadName: student.dadName,
                dadEmail: student.dadEmail,
                dadPhone: student.dadPhone,
                momName: student.momName,
                momPhone: student.momPhone,
                momEmail: student.momEmail
              },
              contact: {
                phone: student.contactPhone,
                code: student.contactCode,
                app: student.contactApp !== 'FALSE'
              }
            }
          })
        )
        self.validateStudents()
      }
      reader.readAsArrayBuffer(file)
    },
    getColor(status) {
      if (status === 'ready') return 'green'
      else if (status === 'success') return 'blue'
      else if (status === 'failed') return 'red'
      else if (status === 'loading') return 'gray'
      else if (status === 'duplicated') return 'orange'
      else if (status === 'validate') return 'gray'
    },

    upload() {
      this.migrateStudents()
    }
  },
  filters: {
    getStatus(status) {
      if (status === 'ready') return 'Hợp Lệ'
      else if (status === 'success') return 'Đã Lưu'
      else if (status === 'failed') return 'Không Hợp Lệ'
      else if (status === 'loading') return 'Đang Lưu'
      else if (status === 'duplicated') return 'Bị Trùng'
      else if (status === 'validate') return 'Đang Kiểm Tra'
    },
    familiarizeDate: time => {
      if (!time) {
        return 'None'
      }
      return moment(time).format('DD/MM/YYYY')
    },
    currencyTuition: tuition => {
      if (!tuition) {
        return '0 đ'
      }
      return new Intl.NumberFormat('vn-VN', {
        style: 'currency',
        currency: 'VND'
      }).format(tuition)
    },
    SimplizedDate: time => {
      if (!time) {
        return 'không có'
      }
      return moment(time).format('DD/MM')
    },
    getClasses(classes) {
      if (!classes || !classes.length) return ''
      if (classes[0]) {
        return classes.map(c => c.title).join(', ')
      }
    }
  }
}
</script>

<style>
.v-select__level-sale {
  font-size: 1em;
  border: none;
}
</style>
