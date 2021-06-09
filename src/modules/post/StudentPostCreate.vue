<template>
  <div>
    <div>
      <v-card flat class="ma-1 mt-4 pa-4 elevation-1">
        <div class="d-flex">
          <AutocompleteGrade
            class="mr-2"
            v-model="grade"
            clear-icon="mdi-close"
            item-text="title"
            item-value="id"
            label="Khối"
            clearable
            flat
            outlined
            dense
            hide-details
            @change="gradeChanged"
          />
          <AutocompleteClass
            class="mr-2"
            :filter="classFilter"
            v-model="selectedClass"
            clear-icon="mdi-close"
            placeholder="Lớp"
            label="Lớp"
            clearable
            flat
            outlined
            dense
            hide-details
            @change="student = null"
          />
          <AutocompleteStudent
            :syncedValue.sync="student"
            clearable
            clear-icon="mdi-close"
            outlined
            class="mr-2"
            label="Học sinh"
            dense
            deletable-chips
            :filter="currentClassId"
            hide-details
          />
          <v-btn color="primary" outlined @click="search">Tìm kiếm</v-btn>
        </div>
      </v-card>
      <div class="d-flex justify-space-between ps-4 py-2">
        <span :class="selecteds.length ? 'text--primary' : 'text--disabled'">
          {{ selecteds.length ? 'Đã chọn ' + selecteds.length + ' học sinh' : 'Chưa chọn' }}
        </span>
        <v-btn small color="primary" :disabled="!selecteds.length" @click="$emit('sendPost', { students: selecteds })"
          >Gửi tin nhắn</v-btn
        >
      </div>
    </div>
    <ContactBookDataTable showSelect ref="studentDataTable" :propHeaders="headers" :selected.sync="selecteds" />
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import AutocompleteGrade from '@/components/basic/input/AutocompleteGrade'
import AutocompleteClass from '@/components/basic/input/AutocompleteClass'
import { get } from 'lodash'
import ContactBookDataTable from '@/modules/contactBook/ContactBookDataTable.vue'
import AutocompleteStudent from '@/components/basic/input/AutocompleteStudent.vue'

export default {
  components: { AutocompleteClass, AutocompleteGrade, ContactBookDataTable, AutocompleteStudent },
  data() {
    return {
      student: {},
      selecteds: [],
      grade: null,
      selectedClass: null,
      studentName: null,
      headers: [
        {
          text: 'Học sinh',
          value: 'name',
          align: 'left',
          sortable: false,
          show: true
        },
        {
          text: 'Ngày sinh',
          value: 'dob',
          align: 'left',
          sortable: false,
          show: true
        },
        { text: 'Lớp', value: 'classes', align: 'left', sortable: false, show: true },
        {
          text: 'Hình thức sử dụng',
          value: 'senderMethod',
          align: 'left',
          sortable: false,
          show: true
        },
        {
          text: 'SĐT đăng ký',
          value: 'phone',
          align: 'left',
          sortable: false,
          show: true
        }
      ]
    }
  },
  computed: {
    ...mapState('postCreate', ['students']),
    classFilter() {
      return this.grade ? { grade: this.grade } : {}
    },
    currentClassId() {
      return { currentClass: get(this.selectedClass, 'id') }
    }
  },
  methods: {
    ...mapActions('postCreate', ['fetchStudentData']),
    gradeChanged(grade) {
      this.selectedClass = null
      this.student = null
      this.grade = grade
    },
    search() {
      const params = {}
      try {
        if (this.grade) params['grade'] = this.grade
        if (this.selectedClass) params['currentClass.id'] = this.selectedClass.id
        if (this.student) params['id'] = this.student.id
        this.$refs.studentDataTable.refresh(params)
      } catch (e) {
        console.error(e)
      }
    }
  }
}
</script>

<style lang="scss" scoped></style>
