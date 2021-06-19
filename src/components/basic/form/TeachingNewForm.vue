<template>
  <v-form ref="form">
    <v-row>
      <v-col cols="6" class="pb-0">
        <autocomplete-grade
          dense
          outlined
          return-object
          label="Khối"
          @change="gradeChanged"
          required
          :rules="[$rules.required]"
          class="required"
        />
      </v-col>
      <v-col cols="6" class="pb-0">
        <AutocompleteClass
          v-model="classData"
          label="Lớp"
          outlined
          dense
          :filter="gradeId"
          required
          @change="classChanged"
          class="required"
          :rules="[$rules.required]"
        />
      </v-col>
      <v-col cols="6" class="py-0">
        <AutocompleteSubject
          return-object
          v-model="subject"
          clear-icon="mdi-close"
          label="Môn học"
          outlined
          dense
          hide-details
          required
          class="required"
          :filter="subjectFilter"
          :rules="[$rules.required]"
        />
      </v-col>
      <v-col cols="6" class="py-0">
        <AutocompleteTeacherCard
          prepend-inner-icon="mdi-magnify"
          v-model="teacher"
          clear-icon="mdi-close"
          label="Giáo viên"
          outlined
          dense
          deletable-chips
          required
          class="required"
          :rules="[$rules.required, ...rules]"
        />
      </v-col>
    </v-row>
  </v-form>
</template>
<script>
import AutocompleteGrade from '@/components/basic/input/AutocompleteGrade'
import AutocompleteSubject from '@/components/basic/input/AutocompleteSubject'
import AutocompleteClass from '@/components/basic/input/AutocompleteClass'
import AutocompleteTeacherCard from '@/components/basic/input/AutocompleteTeacherCard'
import { get } from 'lodash'
import { mapActions } from 'vuex'

export default {
  components: {
    AutocompleteSubject,
    AutocompleteGrade,
    AutocompleteClass,
    AutocompleteTeacherCard
  },
  props: {
    state: Boolean
  },
  data() {
    return {
      grade: null,
      classData: null,
      teacher: null,
      subject: null,
      teachings: null,
      rules: [
        value => {
          if (!this.teachings || !this.subject || !value || !this.classData) return true
          const subjectId = this.subject.id
          const classId = this.classData.id
          return (
            !this.teachings.find(
              m => m.teacher && m.teacher.id === value.id && m.subject.id === subjectId && m.class.id === classId
            ) || 'Giáo viên này đã được phân công vào lớp trên'
          )
        }
      ]
    }
  },
  computed: {
    gradeId() {
      return { grade: get(this.grade, 'id') }
    },
    subjectFilter() {
      return {
        grade: get(this.grade, 'id') || get(this.classData, 'grade.id'),
        division: get(this.classData, 'division.id')
      }
    }
  },
  methods: {
    classChanged(classData) {
      if (this.subject && classData && classData.grade.id !== this.subject.grade.id) {
        this.subject = null
      }
    },
    gradeChanged(grade) {
      if (this.classData && grade && this.classData.grade !== grade) {
        this.classData = null
      }
      if (this.subject && grade && this.subject.subjectGroup.grade !== grade) {
        this.subject = null
      }
      this.grade = grade
    },
    ...mapActions('teaching', ['fetchTeachings']),
    getData() {
      if (this.$refs.form.validate()) {
        return {
          subject: this.subject,
          teacher: this.teacher,
          class: this.classData,
          grade: this.grade,
          subjectGroup: this.subject.subjectGroup
        }
      }
      return null
    },
    resetData() {
      this.grade = null
      this.classData = null
      this.teacher = null
      this.subjectGroup = null
    }
  },
  mounted() {
    this.$refs.form.reset()
  },
  async created() {
    this.teachings = await this.fetchTeachings()
  },
  watch: {
    async state(state) {
      if (!state) {
        this.resetData()
        this.$refs.form.reset()
      } else {
        this.teachings = await this.fetchTeachings()
      }
    }
  }
}
</script>
