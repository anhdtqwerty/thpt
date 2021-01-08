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
      <div>
        <v-btn
          color="primary"
          @click="save"
          :disabled="!classData.id"
          :loading="loading"
        >
          <v-icon left>mdi-plus</v-icon> Lưu
        </v-btn>
      </div>
    </div>

    <v-card class="px-md-6 mx-md-4 elevation-1">
      <v-row>
        <v-col cols="4" class="md-4">
          <autocomplete-class
            v-model="classData"
            item-text="name"
            item-value="id"
            label="Lớp"
            placeholder="Chọn Lớp Học"
            required
            dense
            outlined
          ></autocomplete-class>
        </v-col>
      </v-row>
      <v-data-table
        :loading="loading"
        :headers="originHeaders"
        :items="slots"
        hide-default-footer
        item-key="id"
      >
        <template v-slot:item.monday="props">
          <TimeTableEditDialog :data.sync="props.item['monday']" />
        </template>
        <template v-slot:item.tuesday="props">
          <TimeTableEditDialog :data.sync="props.item['tuesday']" />
        </template>
        <template v-slot:item.wednesday="props">
          <TimeTableEditDialog :data.sync="props.item['wednesday']" />
        </template>
        <template v-slot:item.thursday="props">
          <TimeTableEditDialog :data.sync="props.item['thursday']" />
        </template>
        <template v-slot:item.friday="props">
          <TimeTableEditDialog :data.sync="props.item['friday']" />
        </template>
        <template v-slot:item.saturday="props">
          <TimeTableEditDialog :data.sync="props.item['saturday']" />
        </template>
      </v-data-table>
    </v-card>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import Breadcrumbs from '@/components/layout/Breadcrumbs'
import AutocompleteClass from '@/components/basic/input/AutocompleteClass'
import TimeTableEditDialog from '@/modules/timeTable/TimeTableEditDialog.vue'

const originHeaders = [
  {
    text: '',
    value: 'slot',
    align: 'center',
    sortable: false,
    width: 100
  },
  {
    text: 'Thứ 2',
    value: 'monday',
    align: 'center',
    sortable: false
  },
  {
    text: 'Thứ 3',
    value: 'tuesday',
    align: 'center',
    sortable: false
  },
  {
    text: 'Thứ 4',
    value: 'wednesday',
    align: 'center',
    sortable: false
  },
  {
    text: 'Thứ 5',
    value: 'thursday',
    align: 'center',
    sortable: false
  },
  {
    text: 'Thứ 6',
    value: 'friday',
    align: 'center',
    sortable: false
  },
  {
    text: 'Thứ 7',
    value: 'saturday',
    align: 'center',
    sortable: false
  }
]
const defaultSlots = [
  {
    slot: 'Tiết 1'
  },
  {
    slot: 'Tiết 2'
  },
  {
    slot: 'Tiết 3'
  },
  {
    slot: 'Tiết 4'
  },
  {
    slot: 'Tiết 5'
  },
  {
    slot: 'Tiết 6'
  },
  {
    slot: 'Tiết 7'
  },
  {
    slot: 'Tiết 8'
  },
  {
    slot: 'Tiết 9'
  },
  {
    slot: 'Tiết 10'
  }
]
export default {
  components: {
    Breadcrumbs,
    TimeTableEditDialog,
    AutocompleteClass
  },
  data() {
    return {
      loading: false,
      headers: [],
      originHeaders: originHeaders,
      createState: false,
      filterState: false,
      dialog: false,
      classData: {},
      slots: []
    }
  },
  computed: {},
  created() {
    this.searchTeachers()
    this.searchSubjects()
    if (!this.slots || !this.slots[this.day]) {
    }
  },
  methods: {
    ...mapActions('search', ['searchTeachers', 'searchSubjects']),
    ...mapActions('classDetail', [
      'fetchClass',
      'updateClass',
      'createAttendances'
    ]),
    open() {},
    cancel() {},
    async save() {
      this.loading = true
      await this.updateClass({ id: this.classData.id, schedule: this.slots })
      this.$alert.success('Cập nhật thành công')
      this.loading = false
    },
    close() {}
  },
  watch: {
    classData() {
      if (!this.classData) this.slots = []
      this.slots = this.classData.schedule
        ? this.classData.schedule
        : JSON.parse(JSON.stringify(defaultSlots))
    }
  }
}
</script>
