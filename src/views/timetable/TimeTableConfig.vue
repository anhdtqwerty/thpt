<template>
  <div style="height:100%">
    <div class="pa-4 d-flex justify-space-between align-center">
      <div>
        <Breadcrumbs headline="Thời Khóa Biểu" :link="[{ text: 'Thời khóa biểu', href: '' }]" class="primary--text" />
      </div>
    </div>
    <v-card style="height:100%">
      <v-tabs v-model="tab">
        <v-tab :key="1">Lớp học</v-tab>
        <v-tab :key="2"> Giáo viên</v-tab>
      </v-tabs>
      <div :flat="$vuetify.breakpoint.smAndDown" style="height:100%">
        <v-tabs-items v-model="tab" :class="tabIsFullHeight ? 'fullHeight' : ''">
          <v-tab-item :key="1" class="pa-md-6 mx-md-4 " style="height:100%">
            <v-card class="mb-10 pa-5">
              <v-row>
                <v-col cols="4">
                  <AutocompleteGrade dense outlined return-object label="Khối" @change="gradeChanged" hide-details />
                </v-col>
                <v-col cols="4">
                  <AutocompleteClass v-model="classData" label="Lớp" outlined dense :filter="gradeId" hide-details />
                </v-col>
                <v-col class="d-flex justify-end align-center" cols="4">
                  <v-btn height="40" color="#0D47A1" @click="getClassSlots" outlined>
                    Chọn xem
                  </v-btn>
                </v-col>
              </v-row>
            </v-card>
            <TimeTableTable
              @onCellClick="onChange"
              @deleteSlot="onDeleteSlot"
              :slots="classSlots"
              :selectedClass="selectedClassFromClass"
              type="class"
            />
            <TimeTableBlankView type="class" v-if="!selectedClassFromClass" />
            <TimeTableEditDialog :classData="classData" :state="dialog" :slotData="selected" />
          </v-tab-item>
          <v-tab-item :key="2" class="pa-md-6 mx-md-4 " style="height:100%">
            <v-card class="mb-10 pa-5">
              <v-row>
                <v-col cols="4">
                  <AutocompleteTeacherCard
                    prepend-inner-icon="mdi-magnify"
                    v-model="teacher"
                    item-text="name"
                    clear-icon="mdi-close"
                    label="Giáo viên"
                    outlined
                    dense
                    deletable-chips
                    hide-details
                    :displaySubjectGroup="true"
                  />
                </v-col>
                <v-col class="d-flex justify-end align-center" cols="8">
                  <v-btn height="40" color="#0D47A1" @click="getTeacherSlots" outlined>
                    Chọn xem
                  </v-btn>
                </v-col>
              </v-row>
            </v-card>
            <TimeTableBlankView type="teacher" v-if="!selectedClassFromTeacher" />
            <TimeTableTable :selectedClass="selectedClassFromTeacher" :slots="teacherSlots" type="teacher" />
          </v-tab-item>
        </v-tabs-items>
      </div>
    </v-card>
  </div>
</template>

<script>
import { mapActions, mapState, mapGetters } from 'vuex'
import Breadcrumbs from '@/components/layout/Breadcrumbs'
import AutocompleteClass from '@/components/basic/input/AutocompleteClass'
import AutocompleteGrade from '@/components/basic/input/AutocompleteGrade'
import TimeTableEditDialog from '@/modules/timeTable/TimeTableEditDialog.vue'
import TimeTableTable from '@/modules/timeTable/TimeTableTable.vue'
import AutocompleteTeacherCard from '@/components/basic/input/AutocompleteTeacherCard'
import TimeTableBlankView from '@/modules/timeTable/TimeTableBlankView.vue'
import { isEmpty, get } from 'lodash'

export default {
  components: {
    Breadcrumbs,
    TimeTableEditDialog,
    TimeTableTable,
    AutocompleteClass,
    AutocompleteGrade,
    TimeTableBlankView,
    AutocompleteTeacherCard
  },
  data() {
    return {
      grade: null,
      dialog: false,
      selected: null,
      classData: null,
      tab: null,
      teacher: null,
      selectedClassFromTeacher: '',
      selectedClassFromClass: ''
    }
  },
  computed: {
    ...mapState('timeTable', ['classSlots', 'teacherSlots']),
    ...mapGetters('app', ['commonQuery']),
    gradeId() {
      return { grade: get(this.grade, 'id') }
    },
    tabIsFullHeight() {
      return !(
        (this.tab === 0 && !isEmpty(this.selectedClassFromClass)) ||
        (this.tab === 1 && !isEmpty(this.selectedClassFromTeacher))
      )
    }
  },
  methods: {
    ...mapActions('timeTable', ['fetchClassSlots', 'fetchTeacherSlots', 'removeSlot']),
    onChange(selected) {
      this.selected = selected
      this.dialog = !this.dialog
    },
    async onDeleteSlot(id) {
      try {
        this.$loading.active = true
        await this.removeSlot(id)
        this.$alert.success('Xoá thành công')
      } catch (e) {
        this.$alert.error('Xoá thất bại')
      } finally {
        this.$loading.active = false
      }
    },
    gradeChanged(grade) {
      if (this.classData && grade && this.classData.grade !== grade) {
        this.classData = null
      }
      this.grade = grade
    },
    async getTeacherSlots() {
      this.selectedClassFromTeacher = get(this.teacher, 'id', '')
      if (this.selectedClassFromTeacher) {
        await this.fetchTeacherSlots({ teacher: this.selectedClassFromTeacher, ...this.commonQuery })
      }
    },
    async getClassSlots() {
      this.selectedClassFromClass = get(this.classData, 'id', '')
      if (this.selectedClassFromClass) {
        await this.fetchClassSlots({ class: this.selectedClassFromClass, ...this.commonQuery })
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.fullHeight {
  height: 100%;
}
</style>
