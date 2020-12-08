<template>
  <v-dialog
    :fullscreen="$vuetify.breakpoint.mobile"
    v-model="dialog"
    scrollable
    width="1280"
  >
    <v-card>
      <v-toolbar color="#0D47A1" dense class="elevation-0" dark>
        <v-toolbar-title
          >{{ classData.code }} ({{ classData.startTime }})</v-toolbar-title
        >
        <v-spacer />
        <v-btn icon dark @click="dialog = false">
          <v-icon>close</v-icon>
        </v-btn>
      </v-toolbar>
      <v-card-text style="height: 500px">
        <class-attendance-form
          ref="classAttendanceForm"
          :slotData="slotData"
          :classData="classData"
          :attendances="attendances"
        ></class-attendance-form>
      </v-card-text>
      <v-divider />
      <v-card-actions class="pa-4">
        <v-spacer></v-spacer>
        <v-btn style="min-width: 96px" color="primary" @click="save()"
          >Lưu</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import ClassAttendanceForm from '@/modules/class/attendance/ClassAttendanceForm.vue'
import { mapActions } from 'vuex'

export default {
  components: {
    ClassAttendanceForm
  },
  props: {
    slotData: Object,
    classData: Object,
    attendances: Object,
    data: Object,
    state: Boolean
  },
  data() {
    return {
      dialog: false
    }
  },
  methods: {
    ...mapActions('classDetail', [
      'fetchClass',
      'updateClass',
      'createAttendances'
    ]),
    save() {
      this.dialog = false
      let atts = this.$refs.classAttendanceForm.getData()
      this.createAttendances(atts.filter(a => a.status))
    },
    open() {
      this.dialog = true
    }
  },
  watch: {
    state(state) {
      this.dialog = true
    }
  }
}
</script>
