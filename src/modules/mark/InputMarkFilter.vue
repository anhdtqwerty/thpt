<template>
  <v-form ref="form" flat>
    <v-card flat>
      <v-card-text class="px-6">
        <v-row no-gutters>
          <v-col cols="12">
            <v-row>
              <v-col cols="12" md="4">
                <AutocompleteClass
                  label="Lớp"
                  placeholder="Chọn lớp"
                  hide-details
                  outlined
                  dense
                  @change="onClassChanged"
                />
              </v-col>
              <v-col cols="12" md="4">
                <AutocompleteSubject
                  v-model="subjectData"
                  label="Môn học"
                  return-object
                  placeholder="Chọn môn học"
                  hide-details
                  outlined
                  dense
                  :filter="filterSubject"
                  :disabled="!classData"
                  @change="factorData = null"
                />
              </v-col>
              <v-col cols="12" md="4">
                <AutocompleteFactor
                  v-model="factorData"
                  label="Đầu điểm"
                  placeholder="Chọn đầu điểm"
                  outlined
                  hide-details
                  dense
                  :disabled="!subjectData"
                  :filter="filterFactor"
                />
              </v-col>
              <v-col cols="0" md="1" class="pa-0 ma-0"></v-col>
            </v-row>

            <v-row>
              <v-col cols="12" md="4">
                <AutocompleteSemeter
                  v-model="semesterData"
                  placeholder="Chọn học kỳ"
                  label="Học kỳ"
                  outlined
                  dense
                  hide-details
                  @change="semesterData = $event"
                />
              </v-col>
              <v-col cols="12" md="4">
                <DateIOSPicker
                  outlined
                  dense
                  hide-details
                  label="Ngày nhập"
                  :date.sync="createdDate"
                  @onEnterPress="onFilterChanged"
                />
              </v-col>

              <v-col cols="12" md="4">
                <v-btn
                  :disabled="!classData || !subjectData || !factorData || !createdDate"
                  color="primary"
                  style="width: 100%"
                  @click="onFilterChanged"
                  >Nhập điểm</v-btn
                >
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-form>
</template>

<script>
import { mapState } from 'vuex'
import AutocompleteClass from '@/components/basic/input/AutocompleteClass'
import AutocompleteSubject from '@/components/basic/input/AutocompleteSubject'
import AutocompleteFactor from '@/components/basic/input/AutocompleteFactor'
import AutocompleteSemeter from '@/components/basic/input/AutocompleteSemester'
import DateIOSPicker from '@/components/basic/picker/DateIOSPicker.vue'
import { Division, Subject } from '@/plugins/api'
import moment from 'moment'
import { get } from 'lodash'

export default {
  components: {
    AutocompleteClass,
    AutocompleteSubject,
    AutocompleteFactor,
    AutocompleteSemeter,
    DateIOSPicker
  },
  data: () => ({
    classData: '',
    subjectData: '',
    factorData: '',
    semesterData: '',
    subjects: [],
    factors: [],
    createdDate: ''
  }),
  computed: {
    ...mapState('app', ['currentGeneration', 'currentSemester']),
    filterFactor() {
      return { subject: get(this.subjectData, 'id'), semesterType: this.semesterData.type }
    },
    filterSubject() {
      return { division: get(this.classData, 'division.id') }
    }
  },
  created() {
    this.createdDate = moment().toISOString()
    this.semesterData = this.currentSemester
  },
  methods: {
    async onClassChanged(classData) {
      this.subjectData = null
      this.factorData = null
      this.classData = classData
    },
    onFilterChanged() {
      if (this.$refs.form.validate()) {
        const param = {
          class: this.classData,
          subject: this.subjectData.id,
          factor: this.factorData,
          semester: this.semesterData,
          date: this.createdDate
        }
        this.$emit('onFilterChanged', param)
      }
    }
  }
}
</script>
