<template>
  <div>
    <div>
      <v-card flat class='ma-1 mt-4 pa-4 elevation-1'>
        <div class='d-flex'>
          <AutocompleteGrade
            class='mr-2 flex-grow-1'
            v-model='grade'
            clear-icon='mdi-close'
            item-text='title'
            item-value='id'
            label='Khối'
            clearable
            flat
            outlined
            dense
            hide-details />
          <AutocompleteClass
            class='mr-2 flex-grow-1'
            :filter='classFilter'
            v-model='selectedClass'
            clear-icon='mdi-close'
            placeholder='Lớp'
            label='Lớp'
            clearable
            flat
            outlined
            dense
            hide-details
          />
          <v-text-field
            class='mr-2 flex-grow-1'
            v-model='studentName'
            clear-icon='mdi-close'
            label='Học sinh'
            flat
            outlined
            dense
            clearable
            hide-details
          />
          <v-btn color='primary' outlined @click='search'>Tìm kiếm</v-btn>
        </div>
      </v-card>
      <div class='d-flex justify-space-between ps-4 py-2'>
          <span :class="selecteds.length ? 'text--primary' : 'text--disabled'">
            {{ selecteds.length ? 'Đã chọn ' + selecteds.length + ' học sinh' : 'Chưa chọn' }}
          </span>
        <v-btn small color='primary' :disabled='!selecteds.length' @click="$emit('sendPost', { students: selecteds})">Gửi tin nhắn</v-btn>
      </div>
    </div>
    <student-data-table showSelect ref='studentDataTable' :selected.sync='selecteds' />
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import AutocompleteGrade from '@/components/basic/input/AutocompleteGrade'
import AutocompleteClass from '@/components/basic/input/AutocompleteClass'
import utils from '@/plugins/utils'
import StudentDataTable from '@/modules/student/StudentDataTable'

export default {
  components: { AutocompleteClass, AutocompleteGrade, StudentDataTable },
  data() {
    return {
      selecteds: [],
      grade: null,
      selectedClass: null,
      studentName: null,
      headers: [
        { text: 'Nhóm nhận tin', value: 'title' },
        // { text: 'Số lớp', value: 'classNo' },
        { text: 'Số học sinh', value: 'studentNo' }
      ]
    }
  },
  computed: {
    ...mapState('postCreate', ['students']),
    classFilter() {
      return this.grade ? { grade: this.grade } : {}
    }
  },
  methods: {
    ...mapActions('postCreate', ['fetchStudentData']),
    search() {
      const params = {}
      try {
        if (this.grade) params['grade'] = this.grade
        if (this.selectedClass) params['classes.id'] = this.selectedClass.id
        if (this.studentName) params['name_contains'] = utils.clearUnicode(this.studentName)
        this.$refs.studentDataTable.refresh(params)
      } catch (e) {
        console.error(e)
      }
    }
  }
}
</script>

<style lang='scss' scoped>

</style>
