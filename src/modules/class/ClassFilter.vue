<template>
  <v-form>
    <v-row no-gutters>
      <v-col cols="12" md="8" v-if="advanced">
        <v-row no-gutters>
          <v-col
            :class="{ 'pa-2': $vuetify.breakpoint.mdAndUp }"
            cols="12"
            md="4"
          >
            <autocomplete-grade
              v-model="grade"
              item-text="name"
              item-value="id"
              clear-icon="mdi-close"
              clearable
              label="Khối"
              placeholder="Tất cả"
              outlined
              dense
              deletable-chips
              :hide-details="$vuetify.breakpoint.smAndDown"
              :class="{ 'mb-4': $vuetify.breakpoint.smAndDown }"
            />
          </v-col>
          <v-col
            :class="{ 'pa-2': $vuetify.breakpoint.mdAndUp }"
            cols="12"
            md="4"
          >
            <autocomplete-division
              v-model="division"
              item-text="name"
              clearable
              clear-icon="mdi-close"
              :grade="grade"
              label="Ban"
              placeholder="Tất cả"
              item-value="id"
              outlined
              dense
              deletable-chips
              :hide-details="$vuetify.breakpoint.smAndDown"
              :class="{ 'mb-4': $vuetify.breakpoint.smAndDown }"
            />
          </v-col>
          <v-col
            :class="{ 'pa-2': $vuetify.breakpoint.mdAndUp }"
            cols="12"
            md="4"
          >
            <autocomplete-teacher
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
              :hide-details="$vuetify.breakpoint.smAndDown"
              :class="{ 'mb-4': $vuetify.breakpoint.smAndDown }"
            />
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="12" md="8" v-else>
        <v-row no-gutters>
          <v-col cols="12" md="4">
            <AutocompleteClass
              prepend-inner-icon="mdi-magnify"
              v-model="classData"
              item-text="name"
              item-value="id"
              clear-icon="mdi-close"
              clearable
              label="Tìm kiếm Lớp"
              outlined
              dense
              deletable-chips
              :hide-details="$vuetify.breakpoint.smAndDown"
              :class="{ 'mb-4': $vuetify.breakpoint.smAndDown }"
              @change="onFilterChanged"
            />
          </v-col>
        </v-row>
      </v-col>
      <v-col class="pa-2 d-flex" cols="12" md="4">
        <v-btn
          dark
          outlined
          style="height: 40px"
          @click="onFilterChanged"
          color="primary"
          v-if="advanced"
        >
          <v-icon left dark>mdi-filter-outline</v-icon>Lọc
        </v-btn>
        <v-spacer />
        <v-checkbox
          class="py-0 mt-2 ml-2"
          v-model="advanced"
          label="Nâng cao"
        ></v-checkbox>
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
import AutocompleteClass from '@/components/basic/input/AutocompleteClass'
export default {
  components: {
    AutocompleteTeacher,
    AutocompleteGrade,
    AutocompleteDivision,
    AutocompleteClass
  },
  data: () => ({
    division: '',
    teacher: {},
    grade: '',
    status: 'running',
    tags: '',
    advanced: false,
    classData: ''
  }),
  computed: {
    ...mapState('constant', ['classStatus'])
  },
  methods: {
    onFilterChanged() {
      this.$emit('onFilterChanged', {
        dialog: false,
        grade: this.grade,
        division: this.division,
        teachers: this.teacher,
        _sort: 'createdAt:desc',
        id: this.advanced ? '' : get(this.classData, 'id', null)
      })
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
