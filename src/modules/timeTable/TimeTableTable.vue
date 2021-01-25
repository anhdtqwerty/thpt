<template>
  <table>
    <tr>
      <th colspan="2">Tiết</th>
      <th>Thứ 2</th>
      <th>Thứ 3</th>
      <th>Thứ 4</th>
      <th>Thứ 5</th>
      <th>Thứ 6</th>
      <th>Thứ 7</th>
    </tr>
    <tr v-for="index in 10" :key="index">
      <td v-if="index === 1" rowspan="5">
        Sáng
      </td>
      <td v-if="index === 6" rowspan="5">
        Chiều
      </td>
      <td>Tiết {{ index }}</td>
      <TimeTableCell
        v-for="day in 6"
        @click="$emit('onCellClick', $event)"
        :slotData="slots[`${index}-${day}`]"
        :day="day"
        :index="index"
        :key="day"
      />
    </tr>
  </table>
</template>

<script>
import TimeTableCell from '@/modules/timeTable/TimeTableCell.vue'

export default {
  components: {
    TimeTableCell
  },
  props: {
    slots: Object
  },
  data() {
    return {
      classData: {}
    }
  },
  computed: {},
  created() {
    if (!this.slots || !this.slots[this.day]) {
    }
  },
  methods: {}
}
</script>
<style lang="scss" scoped>
table {
  width: 100%;
  border-collapse: collapse;
}
th,
td {
  white-space: nowrap;
  padding: 8px;
  border: 1px solid #ddd;
}
</style>
