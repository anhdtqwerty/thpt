<template>
  <v-form>
    <v-row class="pa-2">
      <v-col cols="12" md="10">
        <v-row>
          <v-col cols="12" md="4">
            <AutocompleteGrade dense hide-details outlined label="Khối" />
          </v-col>
          <v-col cols="12" md="4">
            <v-select label="Chuyên cần" outlined dense clearable hide-details> </v-select>
          </v-col>
          <v-col cols="12" md="4">
            <DateRangeIOSPicker label="Thời gian" dense hide-details outlined />
          </v-col>
          <v-col cols="12" md="4">
            <AutocompleteClass label="Lớp" dense hide-details outlined />
          </v-col>
          <v-col cols="12" md="4">
            <AutocompleteStudent label="Học sinh" dense hide-details outlined />
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="12" md="2">
        <v-btn height="40" color="#0D47A1" outlined @click="onFilterChanged">
          Tìm kiếm
        </v-btn>
      </v-col>
    </v-row>
  </v-form>
</template>

<script>
import AutocompleteGrade from '@/components/basic/input/AutocompleteGrade.vue'
import DateRangeIOSPicker from '@/components/basic/picker/DateRangeIOSPicker.vue'
import AutocompleteStudent from '@/components/basic/input/AutocompleteStudent.vue'
import AutocompleteClass from '@/components/basic/input/AutocompleteClass.vue'
export default {
  components: {
    AutocompleteGrade,
    DateRangeIOSPicker,
    AutocompleteClass,
    AutocompleteStudent
  },
  data: () => ({
    query: '',
    dialog: false,
    name: '',
    subject: '',
    type: '',
    filterState: false,
    types: [
      { value: 'short-term', title: 'Thỉnh giảng' },
      { value: 'long-term', title: 'Biên chế' }
    ],
    advanced: false
  }),
  methods: {
    onFilterChanged() {
      this.$emit('onFilterChanged', {
        id: this.id,
        name_contains: this.name,
        subject: this.subject.id,
        type: this.type
      })
    },
    onFilterDialogChange(id) {
      this.$emit('onFilterChanged', id)
    }
  }
}
</script>
