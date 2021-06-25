<template>
  <table v-if="selectedClass">
    <tr style="height:61px">
      <th></th>
      <th>Thứ 2</th>
      <th>Thứ 3</th>
      <th>Thứ 4</th>
      <th>Thứ 5</th>
      <th>Thứ 6</th>
      <th>Thứ 7</th>
    </tr>
    <tr v-for="index in 12" :key="index" :class="index != 1 && index != 7 ? 'daySection' : ''">
      <td v-if="index === 1 || index === 7" colspan="7" class="text-center font-weight-bold">
        {{ index === 1 ? 'Sáng' : 'Chiều' }}
      </td>
      <template v-else>
        <td class="text-center">Tiết {{ index - 1 }}</td>
        <TimeTableCell
          v-for="day in 6"
          @click="$emit('onCellClick', $event)"
          @deleteSlot="$emit('deleteSlot', $event)"
          :slotData="slots[`${index - 1}-${day}`]"
          :day="day"
          :index="index - 1"
          :key="day"
          :type="type"
        />
      </template>
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
    slots: Object,
    type: String,
    selectedClass: String
  },
  data() {
    return {
      classData: {}
    }
  }
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
.daySection {
  height: 61px;
}
</style>
