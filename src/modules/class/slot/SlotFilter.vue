<template>
  <v-list dense>
    <v-subheader>Khóa học</v-subheader>
    <v-list-item>
      <v-autocomplete
        :items="slotStatus"
        v-model="status"
        item-text="title"
        item-value="status"
        deletable-chips
        clear-icon="mdi-close"
        clearable
        chips
        small-chips
        @change="onFilterChanged"
        label="Trạng thái"
        single
        outlined
        dense
      ></v-autocomplete>
    </v-list-item>
    <v-list-item>
      <v-autocomplete
        :items="slotTypes"
        v-model="type"
        item-text="title"
        item-value="status"
        deletable-chips
        clear-icon="mdi-close"
        clearable
        chips
        small-chips
        @change="onFilterChanged"
        label="Phân Loại"
        single
        outlined
        dense
      ></v-autocomplete>
    </v-list-item>
    <v-divider></v-divider>

    <v-subheader>Trạng thái</v-subheader>

    <v-radio-group v-model="time" @change="onFilterChanged">
      <div class="pa-4">
        <v-radio label="Đã qua" :value="past"></v-radio>
        <v-radio label="Tương Lai" :value="future"></v-radio>
        <v-radio label="Tất cả" :value="all"></v-radio>
      </div>
    </v-radio-group>
    <v-divider></v-divider>
    <v-subheader>Thời gian</v-subheader>
    <v-radio-group v-model="time" @change="onFilterChanged" style="with: 100%">
      <div class="pa-4">
        <v-radio label="Hôm nay" :value="today"></v-radio>
        <v-radio label="Tuần này" :value="week"></v-radio>
        <v-radio label="Tháng này" :value="month"></v-radio>
        <v-radio label="Tất cả" :value="all"></v-radio>
      </div>
    </v-radio-group>
  </v-list>
</template>

<script>
import { mapState } from 'vuex'
import moment from 'moment'

export default {
  props: {
    defaultFilters: Object
  },
  data: () => ({
    query: '',
    type: '',
    status: '',
    time: null,
    classData: null,
    checkbox: false,
    selectedRole: [],
    past: {
      startTime_lt: moment()
        .startOf('day')
        .toISOString()
    },
    future: {
      startTime_gt: moment()
        .startOf('day')
        .toISOString()
    },
    all: {},
    today: {
      startTime_gt: moment()
        .startOf('day')
        .toISOString(),
      startTime_lt: moment()
        .endOf('day')
        .toISOString()
    },
    week: {
      startTime_gt: moment()
        .startOf('week')
        .toISOString(),
      startTime_lt: moment()
        .endOf('week')
        .toISOString()
    },
    month: {
      startTime_gt: moment()
        .startOf('month')
        .toISOString(),
      startTime_lt: moment()
        .endOf('month')
        .toISOString()
    }
  }),
  computed: {
    ...mapState('constant', ['slotStatus', 'slotTypes'])
  },
  created () {
    this.classData = this.defaultFilters ? this.defaultFilters.class : null
  },
  methods: {
    onFilterChanged () {
      this.$emit('onFilterChanged', {
        status: this.status,
        class: this.classData ? this.classData.id : null,
        type: this.type,
        ...this.time
      })
    }
  },
  watch: {
    defaultFilters (defaultFilters) {
      this.classData = this.defaultFilters ? this.defaultFilters.class : null
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
