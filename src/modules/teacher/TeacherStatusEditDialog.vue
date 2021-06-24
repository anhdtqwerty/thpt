<template>
  <v-dialog v-model="dialog" width="620px" :fullscreen="$vuetify.breakpoint.smAndDown">
    <v-card>
      <v-card-title class="blue darken-4 white--text text-uppercase"
        >CHUYỂN TRẠNG THÁI
        <v-spacer />
        <v-icon color="white" @click="cancel">close</v-icon>
      </v-card-title>
      <v-divider />
      <v-card-text class="pt-5">
        <span>Giáo viên</span>
        <div class="d-flex align-center">
          <CardTeacherName :teacher="teacher" class="mr-10" />
          <div class="mr-10">
            <p class="grey--text mb-0 ">Ngày sinh</p>
            <p class="mb-0">{{ teacher.dob | ddmmyyyy }}</p>
          </div>
          <div class="mr-10">
            <p class="grey--text mb-0 ">Lĩnh vực</p>
            <!-- eslint-disable-next-line -->
            <p class="mb-0">{{ teacher | _get('subjectGroup.title', '&nbsp') }}</p>
          </div>
        </div>
        <v-form class="mt-5">
          <v-row>
            <v-col cols="5" class="d-flex justify-start align-center">
              <div>
                <span class="gray--text" small>Trạng thái hiện tại</span>
                <p class="font-weight-bold">{{ this.teacher.status | teacherStatus }}</p>
              </div>
            </v-col>
            <v-col cols="1" class="d-flex justify-center align-center">
              <v-icon large>mdi-arrow-right</v-icon>
            </v-col>
            <v-col cols="6" class="py-0 d-flex justify-center align-center mr-0">
              <div>
                <div style="height:22px" />
                <v-select
                  :items="statusList"
                  item-text="title"
                  item-value="value"
                  v-model="status"
                  label="Trạng thái hiện tại"
                  outlined
                  dense
                  :rules="[$rules.required]"
                  class="required"
                ></v-select>
              </div>
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>
      <v-divider />
      <v-card-actions class="d-flex justify-space-between pa-6">
        <v-btn outlined class="grey--text" @click="cancel">HUỶ</v-btn>
        <v-btn color="primary" @click="save">LƯU</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
import CardTeacherName from '@/components/basic/card/CardTeacherName.vue'
import { mapActions } from 'vuex'
const originalStatusList = [
  { title: 'Đang dạy', value: 'active' },
  { title: 'Đã nghỉ', value: 'left' }
]
export default {
  components: {
    CardTeacherName
  },
  props: {
    state: Boolean,
    teacher: Object
  },
  data() {
    return {
      dialog: false,
      statusList: originalStatusList,
      status: this.teacher.status || this.statusList[0].value
    }
  },
  methods: {
    ...mapActions('teacher', ['updateTeacher']),
    ...mapActions('teachers', ['requestPageSettings']),
    async save() {
      try {
        this.$loading.active = true
        await this.updateTeacher({ id: this.teacher.id, status: this.status })
        this.$alert.success('Cập nhật thành công')
        await this.requestPageSettings({})
        this.dialog = false
      } catch (error) {
        this.$alert.updateError()
      } finally {
        this.$loading.active = false
      }
    },
    cancel() {
      this.dialog = false
    }
  },
  watch: {
    state(state) {
      this.dialog = true
      this.statusList = originalStatusList.filter(status => status.value !== this.teacher.status)
      this.status = this.statusList[0].value
    }
  }
}
</script>
