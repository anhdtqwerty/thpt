<template>
  <div style="height: 100%">
    <div class="pa-4 d-flex justify-space-between align-center">
      <Breadcrumbs
        headline="Nhập điểm"
        :link="[
          { text: 'Điểm số', href: '/marks' },
          { text: 'Nhập điểm', href: '/marks-input' }
        ]"
      />
    </div>

    <InputMarkFilter class="md-6 mx-md-4 elevation-1 mb-2" @onFilterChanged="onFilterChanged" />
    <InputMarkDataTable v-if="students.length" :marks="marks" :factor="filterParam.factor" @saveMarks="getMarkReq" />
    <MarkBlankView v-else :markView="false" />
  </div>
</template>

<script>
import Breadcrumbs from '@/components/layout/Breadcrumbs'
import { get } from 'lodash'
import InputMarkFilter from '@/modules/mark/InputMarkFilter.vue'
import InputMarkDataTable from '@/modules/mark/InputMarkDataTable.vue'
import MarkBlankView from '@/modules/mark/MarkBlankView.vue'
import { mapState, mapActions, mapGetters } from 'vuex'
export default {
  components: {
    Breadcrumbs,
    InputMarkFilter,
    InputMarkDataTable,
    MarkBlankView
  },
  data() {
    return {
      filterParam: { factor: { quantity: 5 } }
    }
  },
  watch: {},
  computed: {
    ...mapGetters('MarkInput', ['marks', 'students']),
    ...mapGetters('app', ['department']),
    ...mapState('app', ['currentGeneration', 'currentSemester'])
  },
  methods: {
    ...mapActions('MarkInput', ['fetchMarks', 'updateMark', 'setStudents', 'createMark', 'setFactor', 'removeMark']),
    async onFilterChanged(params) {
      this.setStudents(get(params, 'class.students'))
      this.setFactor(get(params, 'factor'))

      this.filterParam = params
      await this.fetchMarks({
        class: get(params, 'class.id'),
        semester: get(params, 'semester.id'),
        subject: get(params, 'subject'),
        factor: get(params, 'factor.id')
      })
    },

    async getMarkReq(studentMarks) {
      this.$loading.active = true

      try {
        await this.onSaveMarks(studentMarks)
        this.$alert.success('Cập nhật điểm thành công')
      } catch (e) {
        this.$alert.error('Cập nhật điểm không thành công')
      }

      this.$loading.active = false
    },

    async onSaveMarks(studentMarks) {
      const promises = studentMarks.reduce((acc, cur) => {
        const markPromies = cur.marks.map(({ index, id, value, rawValue }) => {
          if (id) {
            if (rawValue !== value) {
              if (value) {
                return this.updateMark({ id, value })
              } else {
                return this.removeMark(id)
              }
            } else Promise.resolve()
          } else {
            if (value !== undefined) {
              return this.createMark({
                student: cur.student.id,
                value: value,
                department: this.department.id,
                class: get(this.filterParam, 'class.id'),
                subject: get(this.filterParam, 'subject'),
                grade: get(this.filterParam, 'class.grade.id'),
                generation: this.currentGeneration,
                semester: get(this.filterParam, 'semester.id'),
                factor: get(this.filterParam, 'factor.id'),
                data: { index }
              })
            } else {
              Promise.resolve()
            }
          }
        })
        return [...acc, ...markPromies]
      }, [])

      await Promise.all(promises)
    }
  }
}
</script>

<style lang="scss" scoped></style>
