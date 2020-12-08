<template>
  <v-list dense>
    <v-subheader>Khóa học</v-subheader>
    <v-list-item>
      <autocomplete-class
        v-model="classData"
        item-text="code"
        item-value="id"
        deletable-chips
        clear-icon="mdi-close"
        clearable
        chips
        small-chips
        @change="onFilterChanged"
        label="Tìm kiếm theo mã lớp học"
        outlined
        dense
        :required="false"
      ></autocomplete-class>
    </v-list-item>
    <v-list-item>
      <autocomplete-teacher
        v-model="teacher"
        item-text="name"
        item-value="id"
        deletable-chips
        clear-icon="mdi-close"
        clearable
        chips
        small-chips
        @change="onFilterChanged"
        label="Lọc theo mã Giáo Viên"
        outlined
        dense
        :required="false"
      ></autocomplete-teacher>
    </v-list-item>
    <!--<v-list-item>-->
    <!--<v-autocomplete-->
    <!--:items="attendanceStatus"-->
    <!--v-model="status"-->
    <!--item-text="title"-->
    <!--item-value="status"-->
    <!--deletable-chips-->
    <!--clear-icon="mdi-close" clearable chips small-chips-->
    <!--@change="onFilterChanged"-->
    <!--label="Trạng thái"-->
    <!--single outlined dense-->
    <!--&gt;</v-autocomplete>-->
    <!--</v-list-item>-->
    <v-list-item>
      <v-autocomplete
        :items="allAttendanceStates"
        v-model="state"
        item-text="title"
        item-value="status"
        deletable-chips
        clear-icon="mdi-close"
        clearable
        chips
        small-chips
        @change="onFilterChanged"
        label="Xác Nhận"
        single
        outlined
        dense
      ></v-autocomplete>
    </v-list-item>
    <v-list-item>
      <v-autocomplete
        :items="allSlotTypes"
        v-model="slotType"
        item-text="title"
        item-value="status"
        deletable-chips
        clear-icon="mdi-close"
        clearable
        chips
        small-chips
        @change="onFilterChanged"
        label="Loại Buổi Học"
        single
        outlined
        dense
      ></v-autocomplete>
    </v-list-item>
    <v-divider></v-divider>

    <v-subheader>Thời gian</v-subheader>
    <v-radio-group v-model="time" @change="onFilterChanged" style="with: 100%">
      <div class="pa-4">
        <v-radio label="Tháng Này" :value="month"></v-radio>
        <v-radio label="Tháng Trước" :value="lastMonth"></v-radio>
        <v-radio label="3 Tháng Gần Đây" :value="threeMonth"></v-radio>
        <v-radio label="Tất Cả" :value="all"></v-radio>
      </div>
    </v-radio-group>
  </v-list>
</template>

<script>
import { mapState } from 'vuex'
import moment from 'moment'
import AutocompleteClass from '@/components/basic/input/AutocompleteClass'
import AutocompleteTeacher from '@/components/basic/input/AutocompleteTeacher'

export default {
  components: { AutocompleteClass, AutocompleteTeacher },
  props: {
    defaultFilters: Object
  },
  data: () => ({
    query: '',
    slotType: 'class-slot',
    status: '',
    state: 'wait',
    time: null,
    classData: null,
    teacher: null,
    checkbox: false,
    selectedRole: [],
    past: {
      date_lt: moment()
        .startOf('day')
        .toISOString()
    },
    future: {
      date_gt: moment()
        .startOf('day')
        .toISOString()
    },
    all: {},
    lastMonth: {
      date_gt: moment()
        .startOf('month')
        .subtract(1, 'months')
        .toISOString(),
      date_lt: moment()
        .startOf('month')
        .toISOString()
    },
    threeMonth: {
      date_gt: moment()
        .startOf('month')
        .subtract(3, 'months')
        .toISOString(),
      date_lt: moment()
        .endOf('month')
        .toISOString()
    },
    month: {
      date_gt: moment()
        .startOf('month')
        .toISOString(),
      date_lt: moment()
        .endOf('month')
        .toISOString()
    }
  }),
  computed: {
    ...mapState('constant', [
      'attendanceStatus',
      'attendanceTypes',
      'attendanceStates',
      'slotTypes'
    ]),
    allAttendanceStates () {
      return [
        {
          title: 'Tất Cả',
          status: ''
        },
        ...this.attendanceStates
      ]
    },
    allSlotTypes () {
      return [
        {
          title: 'Tất Cả',
          status: ''
        },
        ...this.slotTypes
      ]
    }
  },
  created () {},
  methods: {
    onFilterChanged () {
      this.$emit('onFilterChanged', {
        teacher: this.teacher ? this.teacher.id : null,
        class: this.classData ? this.classData.id : null,
        state: this.state,
        slotType: this.slotType,
        ...this.time
      })
    }
  }
}
</script>
<style scoped>
.v-input--selection-controls,
.v-input__slot {
  margin: 0;
  padding: 0;
}
</style>
