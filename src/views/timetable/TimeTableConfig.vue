<template>
  <div>
    <div class="pa-4 d-flex justify-space-between align-center">
      <div>
        <Breadcrumbs
          headline="Cấu Hình Thời Khóa Biểu"
          :link="[
            { text: 'Thời khóa biểu', href: '' },
            { text: 'Cấu hình', href: '/time-table/config' }
          ]"
        />
      </div>
    </div>

    <v-card class="pa-md-6 mx-md-4 elevation-1">
      <v-row>
        <v-col cols="4" class="md-4">
          <autocomplete-class
            v-model="classData"
            item-text="name"
            item-value="id"
            label="Lớp"
            placeholder="Chọn Lớp Học"
            auto-select-first
            required
            dense
            outlined
          ></autocomplete-class>
        </v-col>
      </v-row>
      <TimeTableTable @onCellClick="onChange" :slots="slots" />
    </v-card>
    <TimeTableEditDialog
      :classData="classData"
      :state="dialog"
      :slotData="selected"
    />
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import Breadcrumbs from '@/components/layout/Breadcrumbs'
import AutocompleteClass from '@/components/basic/input/AutocompleteClass'
import TimeTableEditDialog from '@/modules/timeTable/TimeTableEditDialog.vue'
import TimeTableTable from '@/modules/timeTable/TimeTableTable.vue'

export default {
  components: {
    Breadcrumbs,
    TimeTableEditDialog,
    TimeTableTable,
    AutocompleteClass
  },
  data() {
    return {
      loading: false,
      createState: false,
      filterState: false,
      dialog: false,
      selected: null,
      classData: {}
    }
  },
  computed: {
    ...mapGetters('classDetail', ['slots'])
  },
  created() {
    this.searchTeachers()
    this.searchSubjects()
  },
  methods: {
    ...mapActions('search', ['searchTeachers', 'searchSubjects']),
    ...mapActions('classDetail', [
      'fetchSlots',
      'createSlot',
      'updateSlot',
      'updateClass'
    ]),
    onChange(selected) {
      this.selected = selected
      this.dialog = !this.dialog
    },
    cancel() {},

    close() {}
  },
  watch: {
    async classData() {
      if (!this.classData) {
      } else {
        await this.fetchSlots({ class: this.classData.id })
        console.log(this.slots)
      }
    },
    slots() {
      console.log(this.slots)
    }
  }
}
</script>
