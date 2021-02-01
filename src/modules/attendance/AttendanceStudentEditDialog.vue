<template>
  <v-dialog
    :fullscreen="$vuetify.breakpoint.smAndDown"
    v-model="dialog"
    width="600"
    scrollable
  >
    <v-card>
      <v-card-title class="primary white--text">
        Sửa điểm danh
        <v-spacer></v-spacer>
        <v-btn dark icon>
          <v-icon @click="cancel">close</v-icon>
        </v-btn>
      </v-card-title>
      <v-divider />
      <v-card-text>
        <v-form ref="form" class="py-4">
          <v-row>
            <v-col cols="12">
              <v-text-field
                label="Lớp"
                v-model="editClass.title"
                dense
                disabled
                outlined
                hide-details
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                label="Học sinh"
                v-model="editStudent.name"
                dense
                disabled
                outlined
                hide-details
              ></v-text-field>
            </v-col>
            <v-col cols="6">
              <time-selector
                outlined
                dense
                :input="formatTime(editInClass, 'LT')"
                label="Giờ đến lớp"
                hide-details
              />
            </v-col>
            <v-col cols="6">
              <time-selector
                outlined
                dense
                :input="formatTime(editOutClass, 'LT')"
                label="Giờ về"
                hide-details
              />
            </v-col>
            <v-col cols="12">
              <v-checkbox
                label="Điểm danh"
                v-model="checkin"
                class="py-0 my-0"
                hide-details
              ></v-checkbox>
            </v-col>
            <v-col cols="12">
              <v-textarea
                label="Ghi chú"
                v-model="note"
                dense
                outlined
                hide-details
              ></v-textarea>
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn class="ma-2" dark depressed color="#0D47A1" @click="save()"
          >Lưu</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import TimeSelector from '@/components/basic/TimeSelector'
import moment from 'moment'

export default {
  components: { TimeSelector },
  props: {
    state: Boolean,
    editStudent: Object,
    editClass: Object,
    editOutClass: String,
    editInClass: String,
  },
  data() {
    return {
      dialog: false,
      checkin: false,
      note: '',
    }
  },
  methods: {
    cancel() {
      this.dialog = false
    },
    formatTime(time, str) {
      return moment(time).format(str)
    },
  },
  watch: {
    state(state) {
      this.dialog = true
    },
  },
}
</script>
