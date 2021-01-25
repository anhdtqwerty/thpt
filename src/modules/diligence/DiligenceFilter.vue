<template>
  <v-form>
    <v-row no-gutters>
      <v-col cols="12" md="10">
        <v-row no-gutters>
          <v-col class="py-2 pr-4" cols="12" md="4"> 
            <AutocompleteGrade
              dense
              hide-details
              outlined
              label="Khối"
            />
          </v-col>
          <v-col class="py-2 pr-4" cols="12" md="4">
            <v-select
              label="Chuyên cần"
              outlined
              dense
              clearable
              hide-details>
            </v-select>
            </v-col>
          <v-col class="py-2 pr-4" cols="12" md="4">
            <DateRangeIOSPicker
            label="Thời gian"
            dense
            hide-details
            outlined/> </v-col>
          <v-col class="py-2 pr-4" cols="12" md="4">
            <AutocompleteClass
            label="Lớp"
            dense
            hide-details
            outlined /> </v-col>
          <v-col class="py-2 pr-4" cols="12" md="4">
            <AutocompleteStudent
            label="Học sinh"
            dense
            hide-details
            outlined /> </v-col
          ><v-col class="py-2 d-flex" cols="12" md="4">
            <v-btn
              v-if="!advanced"
              height="40"
              color="#0D47A1"
              @click="onFilterChanged"
              outlined
            >
              <v-icon left dark>mdi-filter-outline</v-icon>Lọc
            </v-btn>
            <v-spacer />
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="12" md="2">
      </v-col>
    </v-row>
  </v-form>
</template>

<script>
import AutocompleteTeacher from '@/components/basic/input/AutocompleteTeacher'
import AutocompleteSubject from '@/components/basic/input/AutocompleteSubject'
import AutocompleteGrade from '@/components/basic/input/AutocompleteGrade.vue'
import DateRangeIOSPicker from '@/components/basic/picker/DateRangeIOSPicker.vue'
import AutocompleteStudent from '@/components/basic/input/AutocompleteStudent.vue'
import AutocompleteClass from '@/components/basic/input/AutocompleteClass.vue'
export default {
  components: {
    AutocompleteTeacher,
    AutocompleteSubject,
    AutocompleteGrade,
    DateRangeIOSPicker,
    AutocompleteClass,
    AutocompleteStudent,
  },
  data: () => ({
    query: '',
    dialog: false,
    name: '',
    subject: '',
    type: '',
    filterState: false,
    types: [
      { value: 'short-tern', title: 'Ngắn hạn' },
      { value: 'long-tern', title: 'Dài hạn' },
    ],
    advanced: false,
  }),
  methods: {
    onFilterChanged() {
      this.$emit('onFilterChanged', {
        id: this.id,
        name_contains: this.name,
        subject: this.subject.id,
        type: this.type,
      })
    },
    onFilterDialogChange(id) {
      this.$emit('onFilterChanged', id)
    },
  },
}
</script>
