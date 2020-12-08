<template>
  <v-list dense>
    <v-subheader>Bộ Lọc</v-subheader>
    <v-list-item>
      <v-select
        v-model="classData"
        :items="classes"
        item-text="code"
        item-value="id"
        deletable-chips
        clear-icon="mdi-close"
        clearable
        return-object
        chips
        small-chips
        @change="onFilterChanged"
        label="Lớp học"
        outlined
        dense
        :required="false"
        :disabled="!!defaultFilters.class"
      ></v-select>
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
    type: 'class-slot',
    status: 'opened',
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
    ...mapState('constant', ['slotStatus', 'slotTypes']),
    ...mapState('studentDashboard', ['classes'])
  },
  created () {
    this.classData = this.defaultFilters ? this.defaultFilters.class : null
  },
  methods: {
    getValue () {
      return {
        status: this.status,
        class_in: this.classData
          ? [this.classData.id]
          : this.classes.map(i => i.id),
        type: this.type,
        ...this.time
      }
    },
    onFilterChanged () {
      this.$emit('onFilterChanged', this.getValue())
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
