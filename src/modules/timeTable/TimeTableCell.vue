<template>
  <td style="position: relative;minWidth:108px; minHeight: 61px">
    <template v-if="type === 'class'">
      <div
        v-if="slotData"
        class="d-flex flex-column justify-center align-center"
        style="display: block;"
        @click="$emit('click', { ...(slotData || {}), day, index })"
      >
        <p class="ma-0 wrapLongText">
          {{ slotData | _get('subject.title') }}
        </p>
        <span class="caption wrapLongText"> {{ slotData.teacher | getTeacher }}</span>
      </div>
      <v-icon class="closeButton" v-if="slotData" medium color="gray" @click="$emit('deleteSlot', slotData.id)"
        >close</v-icon
      >
      <div v-else class="emptyCell" @click="$emit('click', { ...(slotData || {}), day, index })"></div>
    </template>
    <template v-else>
      <div
        v-if="slotData"
        style="display: block; position:relative"
        class="d-flex flex-column justify-center align-center"
      >
        <p class="ma-0 wrapLongText">{{ slotData | getClass }}</p>
        <span class="caption wrapLongText"> {{ slotData | _get('subject.title') }}</span>
      </div>
      <div v-else></div>
    </template>
  </td>
</template>
<script>
import { get } from 'lodash'
import { textHelpers } from '@/helpers/TextHelper.js'
export default {
  data() {
    return {
      subject: {},
      teacher: {},
      dialog: false
    }
  },
  props: {
    slotData: Object,
    day: Number,
    index: Number,
    type: String
  },
  filters: {
    getTeacher(teacher) {
      if (teacher) {
        const name = textHelpers.getLastName(teacher.name)
        return teacher.gender === 'male' ? `T. ${name}` : `C. ${name}`
      }
      return ''
    },
    getClass(data) {
      const title = get(data, 'class.title')
      if (title) {
        return `Lớp ${title}`
      }
      return ''
    }
  }
}
</script>
<style lang="scss" scoped>
td:hover {
  background-color: #e3e3e3 !important;
}
td {
  padding: 8px !important;
  text-align: center;
  cursor: pointer;
}
.wrapLongText {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  width: 108px;
}
.emptyCell {
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
}
.closeButton {
  position: absolute;
  right: 0;
  top: 0;
}
</style>
