<template>
  <v-form>
    <v-row>
      <v-col cols="12" xs="12" sm="12" md="10">
        <v-row>
          <v-col md="4">
            <AutocompleteGrade
              v-model="grade"
              item-text="name"
              item-value="id"
              clear-icon="mdi-close"
              clearable
              label="Khối"
              outlined
              dense
              deletable-chips
              hide-details
              @change="gradeChanged"
            />
          </v-col>
          <v-col md="4">
            <AutocompleteClass
              v-model="currentClass"
              clear-icon="mdi-close"
              label="Lớp"
              :filter="classFilter"
              clearable
              flat
              outlined
              dense
              return-object
              hide-details
              @change="student = null"
            />
          </v-col>
          <v-col md="4">
            <AutocompleteStudent
              v-model="student"
              return-object
              label="Học sinh"
              outlined
              dense
              hide-details
              clearable
              :filter="currentClassId"
            />
            <!-- <v-text-field
              v-model="studentNameOrCode"
              label="Học sinh"
              return-object
              clearable
              flat
              outlined
              dense
              hide-details
            /> -->
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="12" xs="12" sm="12" md="2"> </v-col>
    </v-row>
    <v-row class="mt-4">
      <v-col cols="12" xs="12" sm="12" md="10">
        <v-row>
          <v-col md="4">
            <v-select
              v-model="status"
              item-text="title"
              item-value="status"
              label="Trạng thái"
              :items="statuses"
              outlined
              clearable
              dense
              hide-details
            ></v-select>
          </v-col>
          <v-col md="4">
            <v-text-field
              v-model="phone"
              label="Số điện thoại đăng ký"
              return-object
              clearable
              flat
              outlined
              dense
              hide-details
            />
          </v-col>
          <v-col md="4">
            <div class="d-flex justify-space-between align-center pt-1">
              <v-checkbox class="mt-0" label="Sử dụng SMS" v-model="isSms" hide-details></v-checkbox>
              <v-checkbox v-model="isApp" class="mt-0" label="Sử dụng APP" hide-details></v-checkbox>
            </div>
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="12" xs="12" sm="12" md="2">
        <v-btn height="40" color="#0D47A1" @click="onFilterChanged" outlined>
          Tìm kiếm
        </v-btn>
      </v-col>
    </v-row>
  </v-form>
</template>

<script>
import AutocompleteClass from '@/components/basic/input/AutocompleteClass'
import AutocompleteGrade from '@/components/basic/input/AutocompleteGrade'
import AutocompleteStudent from '@/components/basic/input/AutocompleteStudent.vue'
import { get } from 'lodash'

export default {
  components: { AutocompleteClass, AutocompleteGrade, AutocompleteStudent },
  data: () => ({
    student: {},
    studentNameOrCode: '',
    phone: '',
    currentClass: {},
    grade: null,
    isSms: false,
    isApp: false,
    status: '',
    statuses: [
      {
        title: 'Chưa cài đặt',
        status: 'inactive'
      },
      {
        title: 'Đã khoá',
        status: 'locked'
      },
      {
        title: 'Hoạt động',
        status: 'active'
      }
    ]
  }),
  computed: {
    classFilter() {
      return this.grade ? { grade: this.grade } : {}
    },
    currentClassId() {
      return { currentClass: get(this.currentClass, 'id') }
    }
  },
  methods: {
    onFilterChanged() {
      const params = {
        grade: this.grade,
        currentClass: get(this.currentClass, 'id'),
        id: get(this.student, 'id'),
        'contactBook.phones_contains': this.phone,
        'contactBook.isApp': this.isApp,
        'contactBook.isSms': this.isSms
      }
      if (this.status === 'inactive') {
        params['contactBook_null'] = true
        params['_sort'] = 'createdAt:desc'
      } else {
        params['contactBook.status'] = this.status
        params['_sort'] = 'contactBook.createdAt:desc'
      }

      this.$emit('onFilterChanged', { ...params })
    },
    gradeChanged(grade) {
      this.grade = grade
      this.currentClass = null
      this.student = null
    }
  }
}
</script>
