<template>
  <v-dialog
    :fullscreen="$vuetify.breakpoint.smAndDown"
    v-model="dialog"
    width="581"
    scrollable
  >
    <v-card>
      <v-card-title class="primary white--text text-uppercase">
        Chuyển trạng thái
        <v-spacer></v-spacer>
        <!-- <v-btn dark icon>
          <v-icon @click="cancel">close</v-icon>
        </v-btn> -->
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
                <p class="text-caption my-0">Ngày sinh</p>
                <span>{{ item.dob }}</span>
              </div>
              <div>
                <p class="text-caption my-0">Mã số</p>
                <span>{{ item.code }}</span>
              </div>
              <div>
                <p class="text-caption my-0">Lớp</p>
                <span>{{ item.classes[0].title }}</span>
              </div>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="6" class="d-flex justify-space-between align-center">
              <div>
                <p class="text-caption my-0">Trạng thái hiện tại</p>
                <span class="text-subtitle-2 font-weight-black">{{
                  item.status | getStatus
                }}</span>
              </div>
              <div>
                <v-icon x-large>mdi_arrow_right_alt</v-icon>
              </div>
            </v-col>
            <v-col cols="6">
              <v-select
                v-model="status"
                :items="studentStatus"
                item-text="title"
                item-value="status"
                dense
                outlined
                label="Trạng thái mới"
                hide-details
              />
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>
      <v-divider></v-divider>
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
import { mapActions, mapState, mapGetters } from 'vuex'
import CardStudentName from '@/components/basic/card/CardStudentName'

export default {
  components: {
    CardStudentName,
  },
  data() {
    return {
      dialog: false,
      status: ''
    }
  },
  props: {
    state: Boolean,
    item: Object,
  },
  computed: {
    ...mapState('app', ['roles', 'department', 'currentGeneration']),
    ...mapState('constant', ['studentStatus']),
    ...mapGetters('app', ['roleIdByName', 'roles']),
    isLoading() {
      return this.loading > 0
    },
    majors() {
      return this.rootMajor.majors || []
    },
  },
  methods: {
    ...mapActions('students', ['updateStudent']),
    async save() {
      await this.updateStudent({
        id: this.item.id,
        status: this.status
      })
      this.dialog = false
    },
  },
  filters: {
    getStatus(status) {
      switch (status) {
        case 'active':
          return 'Đang học'
        case 'reserved':
          return 'Bảo lưu'
        case 'graduated':
          return 'Đã tốt nghiệp'
        case 'left':
          return 'Đã chuyển trường'
      }
    },
  },
  watch: {
    state(state) {
      this.dialog = true
    },
  },
}
</script>