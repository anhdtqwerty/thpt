<template>
  <td @click="$emit('click', { ...(slotData || {}), day, index })">
    <div v-if="slotData" style="display: block; position:relative">
      <span class="subtitle-1"> {{ slotData | getSubject }}</span>
      <br />
      <span class="caption"> {{ slotData | getTeacher }}</span>
    </div>
    <div v-else></div>
  </td>
</template>
<script>
import { mapGetters } from 'vuex'
import { get } from 'lodash'
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
    index: Number
  },
  computed: {
    ...mapGetters('search', ['teachers', 'subjects'])
  },
  methods: {
    cancel() {
      this.snack = true
      this.snackColor = 'error'
      this.snackText = 'Canceled'
    },
    open() {
      this.snack = true
      this.snackColor = 'info'
      this.snackText = 'Dialog opened'
    },
    close() {}
  },
  filters: {
    getTeacher(data) {
      return get(data, 'teacher.name')
    },
    getSubject(data) {
      return get(data, 'subject.title')
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
</style>
