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
        <v-btn color="primary" @click="dialog = !dialog">
          <v-icon left>mdi-plus</v-icon> Lưu
        </v-btn>
      </div>
    </div>

    <v-card class="px-md-6 mx-md-4 elevation-1">
      <v-row>
        <v-col cols="12" class="md-4">
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
          <TimeTableEditDialog day="monday" :slots="props.item" />
        </template>
        <template v-slot:item.tuesday="props">
          <TimeTableEditDialog day="tuesday" :slots="props.item" />
        </template>
        <template v-slot:item.wednesday="props">
          <TimeTableEditDialog day="wednesday" :slots="props.item" />
        </template>
        <template v-slot:item.thursday="props">
          <TimeTableEditDialog day="thursday" :slots="props.item" />
        </template>
        <template v-slot:item.friday="props">
          <TimeTableEditDialog day="friday" :slots="props.item" />
        </template>
        <template v-slot:item.saturday="props">
          <TimeTableEditDialog day="saturday" :slots="props.item" />
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
import moment from 'moment'
import { get } from 'lodash'

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
      slots: [
        {
          slot: 'Tiết 1',

          monday: {
            subject: { title: 'Hóa Học' },
            teacher: { name: 'Thầy Vang' }
          },
          tuesday: {
            subject: { title: 'Hóa Học' },
            teacher: { name: 'Thầy Vang' }
          },
          wednesday: {
            subject: { title: 'Hóa Học' },
            teacher: { name: 'Thầy Vang' }
          }
        }
      ]
    }
  },
  computed: {},
  methods: {
    ...mapActions('violation', ['fetchViolation']),
    open() {},
    cancel() {},
    save() {},
    close() {}
  }
}
</script>
