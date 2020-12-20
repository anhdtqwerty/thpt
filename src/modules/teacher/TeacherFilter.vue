<template>
  <div>
    <v-row class="d-none d-md-flex justify-space-around">
      <autocomplete-teacher
        v-model="name"
        item-text=""
        item-value=""
        label="Họ tên"
        class="ma-2"
        filled
        clearable
        single-line
        dense
      ></autocomplete-teacher>
      <v-btn
        class="ma-2"
        outlined
        height="41"
        color="#0D47A1"
        depressed
        @click="onFilterChanged"
      >
        <v-icon class="" left>mdi-filter-outline</v-icon>Lọc
      </v-btn>
    </v-row>

    <v-row class="d-flex d-md-none justify-end">
      <v-btn icon @click="filterState = !filterState">
        <v-icon left>mdi-filter-outline</v-icon>
      </v-btn>

      <teacher-filter-dialog
        @onFilterChanged="onFilterDialogChange"
        :state="filterState"
      />
    </v-row>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import moment from 'moment'
import AutocompleteTeacher from '@/components/basic/input/AutocompleteTeacher'
import AutocompleteClass from '@/components/basic/input/AutocompleteClass'
import AutocompleteMajor from '@/components/basic/input/AutocompleteMajor'
import DateRangePicker from '@/components/basic/picker/DateRangeIOSPicker'
import TeacherFilterDialog from '@/modules/teacher/TeacherFilterDialog'

export default {
  components: {
    AutocompleteTeacher,
    AutocompleteClass,
    AutocompleteMajor,
    TeacherFilterDialog,
  },
  data: () => ({
    query: '',
    dialog: false,
    name: '',
    filterState: false,
  }),
  methods: {
    onFilterChanged() {
      this.$emit('onFilterChanged', {
        id: this.name,
      })
    },
    onFilterDialogChange(id) {
      this.$emit('onFilterChanged', id)
    },
  },
}
</script>
