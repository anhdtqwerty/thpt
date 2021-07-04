<template>
  <v-form>
    <v-row>
      <v-col cols="12" md="10">
        <v-row>
          <v-col cols="12" md="4">
            <AutocompleteGrade
              return-object
              item-text="name"
              item-value="id"
              clear-icon="mdi-close"
              clearable
              label="Khối"
              placeholder="Tất cả"
              outlined
              dense
              deletable-chips
              hide-details
              @change="gradeChanged"
            />
          </v-col>
          <v-col cols="12" md="4">
            <AutocompleteDivision
              v-model="division"
              item-text="name"
              clearable
              clear-icon="mdi-close"
              label="Ban"
              placeholder="Tất cả"
              item-value="id"
              outlined
              dense
              deletable-chips
              hide-details
              :filter="divisionFilter"
            />
          </v-col>
          <v-col cols="12" md="4">
            <AutocompleteTeacher
              v-model="teacher"
              item-text="name"
              clearable
              clear-icon="mdi-close"
              label="Giáo viên chủ nhiệm"
              placeholder="Tất cả"
              outlined
              item-value="id"
              dense
              deletable-chips
              hide-details
            />
          </v-col>
        </v-row>
      </v-col>
      <v-col class="d-flex" cols="12" md="2">
        <v-btn dark outlined style="height: 40px" @click="onFilterChanged" color="primary">
          Tìm kiếm
        </v-btn>
        <v-spacer />
      </v-col>
    </v-row>
  </v-form>
</template>

<script>
import { mapState } from 'vuex'
import { get } from 'lodash'
import AutocompleteTeacher from '@/components/basic/input/AutocompleteTeacher'
import AutocompleteGrade from '@/components/basic/input/AutocompleteGrade'
import AutocompleteDivision from '@/components/basic/input/AutocompleteDivision'
export default {
  components: {
    AutocompleteTeacher,
    AutocompleteGrade,
    AutocompleteDivision
  },
  data: () => ({
    division: '',
    teacher: {},
    grade: {},
    status: 'running',
    tags: '',
    classData: ''
  }),
  computed: {
    ...mapState('constant', ['classStatus']),

    divisionFilter() {
      return { academicLevel: get(this.grade, 'academicLevel.id') }
    }
  },
  methods: {
    onFilterChanged() {
      this.$emit('onFilterChanged', {
        grade: get(this.grade, 'id'),
        division: this.division,
        teachers: this.teacher,
        _sort: 'createdAt:DESC'
      })
    },
    gradeChanged(grade) {
      if (get(this.grade, 'academicLevel.id') !== get(grade, 'academicLevel.id')) {
        this.division = null
        this.teacher = null
      }
      this.grade = grade
    },
    reset() {
      this.how = false
      this.query = ''
      this.grade = ''
      this.status = 'running'
      this.division = ''
      this.teacher = ''
    }
  }
}
</script>

<style scoped></style>
