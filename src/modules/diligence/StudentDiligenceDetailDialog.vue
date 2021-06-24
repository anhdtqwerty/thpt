<template>
  <v-dialog :fullscreen="$vuetify.breakpoint.smAndDown" v-model="dialog" width="581" scrollable>
    <v-card>
      <v-card-title class="primary white--text text-uppercase">
        Sửa chuyên cần
        <v-spacer></v-spacer>
        <v-btn dark icon>
          <v-icon @click="cancel">close</v-icon>
        </v-btn>
      </v-card-title>
      <v-divider />
      <v-card-text>
        <v-form ref="form" class="py-4">
          <v-row>
            <v-col cols="6">
              <p class="text-caption my-0">Học sinh</p>
              <card-student-name :student="item" />
            </v-col>
            <v-col class="d-flex justify-space-between align-center" cols="6">
              <div>
                <div class="my-0">Ngày sinh</div>
                <span class="black--text">{{ item.dob | ddmmyyyy }}</span>
              </div>
              <div>
                <div class="text-caption my-0">Mã số</div>
                <span class="black--text">{{ item.code | getStudentCode }}</span>
              </div>
              <div>
                <div class="text-caption my-0">Lớp</div>
                <span class="black--text">{{ item.class && item.class.title }}</span>
              </div>
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn class="ma-2" dark depressed color="#0D47A1" @click="save">Lưu</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapActions, mapState, mapGetters } from 'vuex'
import CardStudentName from '@/components/basic/card/CardStudentName'

export default {
  components: {
    CardStudentName
  },
  data() {
    return {
      dialog: false,
      currentClass: null
    }
  },
  props: {
    state: Boolean,
    item: Object
  },
  computed: {
    ...mapState('app', ['roles', 'department', 'currentGeneration']),
    ...mapGetters('app', ['roleIdByName', 'roles'])
  },
  methods: {
    ...mapActions('students', ['updateStudent']),

    cancel() {
      this.dialog = false
      this.reset()
    }
  },
  watch: {
    state(state) {
      this.dialog = true
    }
  }
}
</script>
