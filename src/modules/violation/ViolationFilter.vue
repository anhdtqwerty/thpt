<template>
  <v-form ref="form">
    <v-row no-gutters>
      <v-col cols="12" md="10">
        <v-row no-gutters>
          <v-col cols="12" md="4">
            <autocomplete-student
              v-model="student"
              item-text="name"
              clearable
              clear-icon="mdi-close"
              outlined
              placeholder="Tên học sinh"
              item-value="id"
              dense
              deletable-chips
              :hide-details="$vuetify.breakpoint.smAndDown"
              :class="{ 'mb-4': $vuetify.breakpoint.smAndDown }"
            />
          </v-col>
          <v-col cols="12" md="4">
            <DateRangeIOSPicker
              :date-range.sync="dateRange"
              placeholder="Ngày"
              outlined
            />
          </v-col>
          <v-col cols="12" md="4">
            <autocomplete-class
              v-model="classData"
              clear-icon="mdi-close"
              clearable
              placeholder="Lớp"
              outlined
              dense
              large
              deletable-chips
              :hide-details="$vuetify.breakpoint.smAndDown"
              :class="{ 'mb-4': $vuetify.breakpoint.smAndDown }"
            />
          </v-col>
        </v-row>
      </v-col>

      <v-col cols="12" md="2">
        <v-btn
          class="py-4"
          dark
          @click="onFilterChanged"
          color="primary"
          outlined
        >
          <v-icon left dark>mdi-filter-outline</v-icon>Lọc
        </v-btn>
      </v-col>
    </v-row>
  </v-form>
</template>

<script>
import { mapState } from 'vuex'
import moment from 'moment'
import AutocompleteStudent from '@/components/basic/input/AutocompleteStudent.vue'
import AutocompleteClass from '@/components/basic/input/AutocompleteClass.vue'
import DateRangeIOSPicker from '@/components/basic/picker/DateRangeIOSPicker.vue'

export default {
  components: {
    AutocompleteClass,
    AutocompleteStudent,
    DateRangeIOSPicker,
  },
  data: () => ({
    student: {},
    classData: '',
    tags: '',
    student: '',
    query: '',
    time: null,
    createdAt_gt: '',
    createdAt_lt: '',
    dateRange: [],
  }),
  computed: {
    ...mapState('constant', ['classStatus']),
  },
  methods: {
    onFilterChanged() {
      console.log({
        class: this.classData,
        student: this.student,
        dateRange: this.dateRange,
        _sort: 'createdAt:desc',
      })
      this.createdAt_gt = ''
      this.createdAt_lt = ''
      if (this.dateRange.length > 1) {
        this.createdAt_gt = moment(
          this.dateRange[0],
          'DD/MM/YYYY'
        ).toISOString()
        this.createdAt_lt = moment(this.dateRange[1], 'DD/MM/YYYY')
          .add(1, 'd')
          .toISOString()
      } else if (this.dateRange.length > 0) {
        this.createdAt_gt = moment(
          this.dateRange[0],
          'DD/MM/YYYY'
        ).toISOString()
        this.createdAt_lt = moment(this.dateRange[0], 'DD/MM/YYYY')
          .add(1, 'd')
          .toISOString()
      }
      this.$emit('onFilterChanged', {
        class: this.classData.id,
        student: this.student.id,
        createdAt_gt: this.createdAt_gt,
        createdAt_lt: this.createdAt_lt,
        _sort: 'createdAt:desc',
      })
      this.reset()
    },
    reset() {
      this.classData = ''
      this.student = ''
      this.dateRange = []
    },
  },
}
</script>

<style scoped></style>
