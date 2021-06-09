<template>
  <v-dialog :fullscreen="$vuetify.breakpoint.smAndDown" v-model="dialog" width="581" scrollable>
    <v-card>
      <v-card-title class="primary white--text text-uppercase">
        Chuyển trạng thái
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
              <div class="text-caption my-0">Học sinh</div>
              <CardStudentName :isShowCode="false" :student="item" />
            </v-col>
            <v-col class="d-flex justify-space-between align-center" cols="6">
              <div>
                <div class="text-caption my-0">Ngày sinh</div>
                <span class="black--text">{{ item.dob | ddmmyyyy }}</span>
              </div>
              <div>
                <div class="text-caption my-0">Mã số</div>
                <span class="black--text">{{ item.code | getStudentCode }}</span>
              </div>
              <div>
                <div class="text-caption my-0">Lớp</div>
                <span class="black--text">{{ item.currentClass && item.currentClass.title }}</span>
              </div>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="3">
              <div>
                <p class="text-caption my-0">Trạng thái hiện tại</p>
                <span class="text-subtitle-2 font-weight-black">{{ item.status | getStatus }}</span>
              </div>
            </v-col>
            <v-col cols="3" class="d-flex justify-center align-start">
              <v-icon large>mdi-arrow-right</v-icon>
            </v-col>
            <v-col cols="6">
              <v-select
                v-model="status"
                :items="statusFilter"
                item-text="title"
                item-value="status"
                dense
                outlined
                label="Trạng thái mới"
                class="required"
                :rules="[$rules.required]"
              />
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn class="ma-2" dark depressed color="#0D47A1" @click="save()">Lưu</v-btn>
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
      status: '',
      studentStatus: [
        {
          title: 'Đang học',
          status: 'active'
        },
        {
          title: 'Bảo lưu',
          status: 'reserved'
        },
        {
          title: 'Đã nghỉ',
          status: 'left'
        }
      ]
    }
  },
  props: {
    state: Boolean,
    item: Object
  },
  computed: {
    ...mapState('app', ['roles', 'department', 'currentGeneration']),
    ...mapGetters('app', ['roleIdByName', 'roles']),
    isLoading() {
      return this.loading > 0
    },
    majors() {
      return this.rootMajor.majors || []
    },
    statusFilter() {
      return this.studentStatus.filter(s => this.item.status !== s.status)
    }
  },
  methods: {
    ...mapActions('students', ['updateStudent']),
    async save() {
      if (!this.$refs.form.validate()) return
      try {
        this.$loading.active = true

        await this.updateStudent({
          id: this.item.id,
          status: this.status
        })
        this.$alert.updateSuccess()
        this.$refs.form.reset()
      } catch (error) {
        this.$alert.updateError()
      } finally {
        this.$loading.active = false
      }

      this.dialog = false
    },
    cancel() {
      this.dialog = false
      this.$refs.form.reset()
    }
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
          return 'Đã nghỉ'
      }
    }
  },
  watch: {
    state(state) {
      this.dialog = true
    }
  }
}
</script>
