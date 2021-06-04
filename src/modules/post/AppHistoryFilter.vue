<template>
  <v-form>
    <v-row>
      <v-col cols="12" xs="12" sm="12" md="10">
        <v-row class="mb-0">
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
              :syncedValue.sync="student"
              return-object
              label="Học sinh"
              outlined
              dense
              clearable
              :filter="currentClassId"
              hide-details
            />
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="12" xs="12" sm="12" md="2"> </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" xs="12" sm="12" md="10">
        <v-row class="mb-0">
          <v-col md="4">
            <DateIOSPicker
              label="Từ ngày"
              outlined
              dense
              hide-details
              outline
              :date.sync="dateFrom"
              @onEnterPress="onFilterChanged"
            />
          </v-col>
          <v-col md="4">
            <DateIOSPicker
              label="Đến ngày"
              outlined
              dense
              hide-details
              outline
              :date.sync="dateTo"
              @onEnterPress="onFilterChanged"
            />
          </v-col>
          <v-col md="4">
            <v-select
              v-model="status"
              item-text="title"
              item-value="value"
              label="Trạng thái"
              :items="smsStatuses"
              outlined
              clearable
              dense
              hide-details
            ></v-select>
          </v-col>
        </v-row>
      </v-col>
      <v-col v-if="!advanceSearch" cols="12" xs="12" sm="12" md="2">
        <div class="d-flex flex-column justify-start">
          <v-btn outlined color="#0D47A1" medium @click="onFilterChanged">
            <span class="d-none d-md-flex">Tìm kiếm</span>
          </v-btn>
          <div
            @click="advanceSearch = true"
            class="d-none d-md-flex primary--text justify-end mt-2"
            style="white-space: nowrap; cursor: pointer;"
          >
            Chọn tìm kiếm nâng cao
          </div>
        </div>
      </v-col>
    </v-row>
    <v-row v-if="advanceSearch">
      <v-col cols="12" xs="12" sm="12" md="10">
        <v-row>
          <v-col md="4">
            <v-select
              v-model="postType"
              item-text="title"
              item-value="value"
              label="Dạng tin"
              :items="postTypes"
              outlined
              clearable
              dense
              hide-details
            ></v-select>
          </v-col>

          <v-col md="4">
            <v-select
              v-model="config"
              item-text="title"
              item-value="value"
              :items="postConfigs"
              label="Loại tin gửi"
              clearable
              flat
              outlined
              dense
              hide-details
            />
          </v-col>
          <v-col md="4">
            <v-select
              v-model="postToType"
              item-text="title"
              item-value="value"
              label="Đối tượng nhận"
              :items="postToTypes"
              outlined
              clearable
              dense
              hide-details
            ></v-select>
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="12" xs="12" sm="12" md="2">
        <div class="d-flex flex-column justify-start">
          <v-btn outlined color="#0D47A1" medium @click="onFilterChanged">
            <span class="d-none d-md-flex">Tìm kiếm</span>
          </v-btn>
          <div
            @click="advanceSearch = false"
            class="d-none d-md-flex primary--text justify-end mt-2"
            style="white-space: nowrap; cursor: pointer;"
          >
            Ẩn tìm kiếm nâng cao
          </div>
        </div>
      </v-col>
    </v-row>
  </v-form>
</template>

<script>
import AutocompleteClass from '@/components/basic/input/AutocompleteClass'
import AutocompleteGrade from '@/components/basic/input/AutocompleteGrade'
import AutocompleteStudent from '@/components/basic/input/AutocompleteStudent.vue'
import DateIOSPicker from '@/components/basic/picker/DateIOSPicker'
import { mapGetters } from 'vuex'
import moment from 'moment'
import { get } from 'lodash'

export default {
  components: { AutocompleteClass, AutocompleteGrade, AutocompleteStudent, DateIOSPicker },
  data: () => ({
    postType: '',
    postToType: '',
    receiver: null,
    config: '',
    dateFrom: '',
    dateTo: '',
    advanceSearch: false,
    student: {},
    studentNameOrCode: '',
    currentClass: {},
    grade: null,
    status: '',
    dateData_gte: '',
    dateData_lte: ''
  }),
  computed: {
    ...mapGetters('constant', ['postTypes', 'smsStatuses', 'postToTypes', 'postConfigs']),

    classFilter() {
      return this.grade ? { grade: this.grade } : {}
    },
    currentClassId() {
      return { currentClass: get(this.currentClass, 'id') }
    }
  },
  methods: {
    onFilterChanged() {
      console.log('date', this.dateFrom, this.dateTo)
      if (this.dateFrom && this.dateTo) {
        this.dateData_gte = moment(this.dateFrom)
          .startOf('day')
          .toISOString()
        this.dateData_lte = moment(this.dateTo)
          .endOf('day')
          .toISOString()
      } else if (this.dateFrom) {
        this.dateData_gte = moment(this.dateFrom)
          .startOf('day')
          .toISOString()
        this.dateData_lte = moment().toISOString()
      } else if (this.dateTo) {
        this.dateData_lte = moment(this.dateTo)
          .endOf('day')
          .toISOString()
      }

      const params = {
        grade: this.grade,
        class: get(this.currentClass, 'id'),
        student: get(this.student, 'id'),
        createdAt_gte: this.dateData_gte,
        createdAt_lte: this.dateData_lte,
        status: this.status,
        postType: this.postType,
        postToType: this.postToType
      }

      if (this.config === 'auto') params.config_ne = 'immediately'
      else params.config = this.config

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
