<template>
  <div class="text-center">
    <v-dialog v-model="dialog" width="680">
      <v-card>
        <student-mark :mark="mark"></student-mark>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import StudentMark from '@/modules/student/mark/StudentMark.vue'
export default {
  components: {
    StudentMark
  },
  props: {
    state: Boolean,
    mark: Object
  },
  data () {
    return {
      dialog: false
    }
  },
  watch: {
    state (state) {
      this.dialog = true
    }
  }
}
</script>
