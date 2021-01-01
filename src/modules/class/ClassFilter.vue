<template>
  <v-form>
    <v-row :class="{ 'mt-7': $vuetify.breakpoint.smAndDown }" no-gutters>
      <v-col cols="12" md="10">
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
              placeholder="Khối"
              filled
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
              placeholder="Ban"
              item-value="id"
              filled
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
              placeholder="Giáo viên chủ nhiệm"
              filled
              item-value="id"
              dense
              deletable-chips
              :hide-details="$vuetify.breakpoint.smAndDown"
              :class="{ 'mb-4': $vuetify.breakpoint.smAndDown }"
            />
          </v-col>
        </v-row>
      </v-col>

      <v-col class="pa-2" cols="12" md="2">
        <v-btn large dark @click="onFilterChanged" color="primary" outlined>
          <v-icon left dark>mdi-filter-outline</v-icon>Lọc
        </v-btn>
      </v-col>
    </v-row>
  </v-form>
</template>

<script>
import { mapState } from 'vuex'
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
    grade: '',
    status: 'running',
    tags: ''
  }),
  computed: {
    ...mapState('constant', ['classStatus'])
  },
  methods: {
    onFilterChanged() {
      console.log({
        dialog: false,
        grade: this.grade,
        division: this.division,
        teacher: this.teacher,
        _sort: 'createdAt:desc'
      })
      this.$emit('onFilterChanged', {
        dialog: false,
        grade: this.grade,
        division: this.division,
        teachers: this.teacher,
        _sort: 'createdAt:desc'
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
