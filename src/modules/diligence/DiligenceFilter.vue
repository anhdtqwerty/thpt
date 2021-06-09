<template>
  <v-form>
    <v-row class="pa-4">
      <v-col cols="12" md="10">
        <v-row>
          <v-col cols="12" md="4">
            <AutocompleteGrade
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
          </v-col>
          <v-col cols="12" md="4">
            <AutocompleteClass
              :filter="classFilter"
              v-model="classData"
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
          </v-col>
          <v-col cols="12" md="4">
            <AutocompleteStudent
              :syncedValue.sync="student"
              clearable
              clear-icon="mdi-close"
              outlined
              label="Học sinh"
              dense
              deletable-chips
              :filter="currentClassId"
              hide-details
            />
          </v-col>
          <v-col cols="12" md="4">
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
          <v-col cols="12" md="4">
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
          <v-col cols="12" md="4">
            <v-select
              v-model="status"
              item-text="title"
              item-value="status"
              label="Hình thức nghỉ"
              :items="diligenceStatus"
              outlined
              clearable
              dense
              hide-details
            ></v-select>
          </v-col>
        </v-row>
      </v-col>
      <v-col class="d-flex align-end" cols="12" md="2">
        <v-btn height="40" color="#0D47A1" outlined @click="onFilterChanged">
          Tìm kiếm
        </v-btn>
      </v-col>
    </v-row>
  </v-form>
</template>

<script>
import AutocompleteGrade from '@/components/basic/input/AutocompleteGrade.vue'
import AutocompleteStudent from '@/components/basic/input/AutocompleteStudent.vue'
import AutocompleteClass from '@/components/basic/input/AutocompleteClass.vue'
import DateIOSPicker from '@/components/basic/picker/DateIOSPicker.vue'
import { mapState } from 'vuex'
import { get } from 'lodash'

export default {
  components: {
    AutocompleteGrade,
    AutocompleteClass,
    AutocompleteStudent,
    DateIOSPicker
  },
  data: () => ({
    grade: {},
    classData: {},
    student: {},
    dateFrom: '',
    dateTo: '',
    status: ''
  }),
  computed: {
    ...mapState('constant', ['diligenceStatus']),
    classFilter() {
      return { grade: get(this.grade, 'id') }
    },
    currentClassId() {
      return { currentClass: get(this.classData, 'id') }
    }
  },
  methods: {
    onFilterChanged() {
      this.$emit('onFilterChanged', {
        id: this.id,
        name_contains: this.name,
        subject: this.subject.id,
        type: this.type
      })
    },
    gradeChanged(grade) {
      this.grade = grade
      this.classData = null
      this.student = null
    }
  }
}
</script>
