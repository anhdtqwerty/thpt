<template>
  <v-form ref="form" flat>
    <v-card flat>
      <v-card-text class="px-2">
        <v-row no-gutters>
          <v-col cols="12">
            <v-row>
              <v-col cols="12" md="4">
                <AutocompleteClass
                  placeholder="Chọn lớp"
                  outlined
                  dense
                  :rules="[$rules.required]"
                  @change="onClassChanged"
                />
              </v-col>
              <v-col cols="12" md="4">
                <AutocompleteSubject
                  return-object
                  placeholder="Chọn môn học"
                  outlined
                  dense
                  :rules="[$rules.required]"
                  :defaultSubjects="subjects"
                  @change="subjectData = $event"
                />
              </v-col>
              <v-col cols="12" md="4">
                <AutocompleteFactor
                  placeholder="Chọn đầu điểm"
                  outlined
                  dense
                  :filter="filterFactor"
                  :rules="[$rules.required]"
                  @change="factorData = $event"
                />
              </v-col>
              <v-col cols="0" md="1" class="pa-0 ma-0"></v-col>
            </v-row>

            <v-row>
              <v-col cols="12" md="4">
                <AutocompleteSemeter
                  v-model="semesterData"
                  placeholder="Chọn học kỳ"
                  outlined
                  dense
                  hide-details
                  @change="semesterData = $event"
                />
              </v-col>
              <v-col cols="12" md="4">
                <DateIOSPicker outlined dense hide-details label="Ngày nhập" :date.sync="createdDate" />
              </v-col>

              <v-col cols="12" md="4">
                <v-btn color="primary" style="width: 100%" @click="onFilterChanged">Nhập điểm</v-btn>
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
import { Division } from '@/plugins/api'
import moment from 'moment'

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
      return { subject: this.subjectData.id, semesterType: this.semesterData.type }
    }
  },
  created() {
    this.createdDate = moment().toISOString()
    this.semesterData = this.currentSemester
  },
  methods: {
    async onClassChanged(classData) {
      this.classData = classData
      const division = await Division.fetchOne(this.classData.division.id)
      this.subjects = division.subjects
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
