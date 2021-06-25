<template>
  <v-dialog v-model="dialog" width="450px">
    <v-card>
      <v-card-title class="headline primary lighten-1 white--text">
        {{ this.slotData && (this.slotData.id ? 'SỬA THỜI KHOÁ BIỂU' : 'THÊM THỜI KHOÁ BIỂU') }}
      </v-card-title>
      <v-card-text class="pa-4">
        <v-form ref="form">
          <AutocompleteTeachingSubject
            dense
            class="required"
            :rules="[$rules.required]"
            :filter="teachingSubjectFilter"
            @change="subjectChanged"
            outlined
            v-model="subjectClone"
            label="Môn học"
          />
          <AutocompleteTeachingTeacher
            dense
            class="required"
            :rules="[$rules.required, rules.teacherRule]"
            :filter="teachingTeacherFilter"
            outlined
            v-model="teacher"
            :displaySubjectGroup="true"
            label="Giáo viên"
          />
        </v-form>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions class="d-flex justify-space-between pa-4">
        <v-btn depressed outlined @click="cancel">Huỷ</v-btn>
        <v-btn depressed color="primary" small @click="save">Lưu</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
import { mapActions, mapState, mapGetters } from 'vuex'
import AutocompleteTeachingSubject from '@/components/basic/input/AutocompleteTeachingSubject'
import AutocompleteTeachingTeacher from '@/components/basic/input/AutocompleteTeachingTeacher'
import { get } from 'lodash'

export default {
  components: {
    AutocompleteTeachingSubject,
    AutocompleteTeachingTeacher
  },
  data() {
    return {
      dialog: false,
      subject: '',
      teacher: '',
      subjectClone: '',
      rules: {
        teacherRule: v => {
          const classSlot = Object.values(this.slots).find(
            s => s.teacher.id === v && s.index === this.slotData.index && s.day === this.slotData.day
          )
          return !classSlot || 'Giáo viên bị xếp trùng tiết'
        }
      }
    }
  },
  props: {
    slotData: Object,
    state: Boolean,
    classData: Object
  },
  created() {
    this.fetchSlots()
    if (!this.slotData) return
    this.subject = this.slotData.subject
    this.teacher = this.slotData.teacher
  },
  computed: {
    ...mapState('timeTable', ['teachings', 'classSlots', 'slots']),
    ...mapGetters('app', ['commonQuery']),
    teachingSubjectFilter() {
      return { class: get(this.classData, 'id') }
    },
    teachingTeacherFilter() {
      return { class: get(this.classData, 'id'), subject: this.subject }
    }
  },
  methods: {
    ...mapActions('timeTable', ['createSlot', 'updateSlot', 'fetchTeachings', 'fetchSlots']),
    subjectChanged(subject) {
      if (subject && this.teacher) {
        const teaching = this.teachings.find(t => t.subject.id === subject && t.teacher.id === this.teacher)
        if (!teaching) {
          this.teacher = ''
        }
      }
      this.subject = subject
    },
    async save() {
      if (!this.$refs.form.validate()) return
      try {
        this.$loading.active = true

        if (!this.slotData.id) {
          await this.createSlot({
            ...this.slotData,
            ...this.commonQuery,
            class: get(this, 'classData.id'),
            subject: this.subject,
            teacher: this.teacher
          })
          this.$alert.success('Tạo đầu điểm mới thành công')
        } else {
          await this.updateSlot({
            id: this.slotData.id,
            subject: this.subject,
            teacher: this.teacher
          })
          this.$alert.success('Cập nhật thành công')
        }
      } catch (e) {
        this.$alert.error(e.message)
      } finally {
        this.$loading.active = false
        this.dialog = false
      }
    },
    cancel() {
      this.dialog = false
    }
  },
  filters: {
    getTeacher(slotData) {
      return get(slotData, 'teacher.name')
    },
    getSubject(slotData) {
      return get(slotData, 'subject.title')
    }
  },
  watch: {
    async state() {
      await this.fetchTeachings({})
      await this.fetchSlots({ ...this.commonQuery })
      this.$refs.form && this.$refs.form.resetValidation()
      this.dialog = true
      this.subject = this.subjectClone = get(this.slotData, 'subject.id', '')
      this.teacher = get(this.slotData, 'teacher.id', '')
    }
  }
}
</script>
<style lang="scss" scoped>
::v-deep td div {
  height: 100%;
  background-color: red;
}
</style>
