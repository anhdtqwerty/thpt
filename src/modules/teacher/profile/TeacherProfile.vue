<template>
  <v-row
    :no-gutters="$vuetify.breakpoint.smAndDown"
    class="px-md-3"
    v-if="teacher"
  >
    <v-col class="text-center" cols="12" md="3">
      <v-card class="pa-0">
        <user-avatar-picker width="100%" :student="teacher" type="students" />
        <span
          class="d-inline-block font-weight-bold mt-6 can-click"
          @click="editController"
        >
          Sửa hồ sơ giáo viên
        </span>
        <br />
        <span @click="remove" class="d-inline-block can-click red--text py-4"
          >Xóa giáo viên</span
        >
      </v-card>
    </v-col>
    <v-col class="" cols="12" md="9">
      <v-card :flat="$vuetify.breakpoint.smAndDown"
        ><v-tabs v-model="tab">
          <v-tab :key="1"> Hồ sơ </v-tab>
          <v-tab :key="2"> Giảng dạy </v-tab>
          <v-tab :key="3"> Chủ nhiệm </v-tab>
        </v-tabs>

        <v-tabs-items v-model="tab">
          <v-tab-item :key="1">
            <v-row>
              <v-col cols="9">
                <teacher-general-info
                  ref="teacherGeneralInfo"
                  :edit="edit"
                  :teacher="teacher"
                />
              </v-col>
            </v-row>
          </v-tab-item>
        </v-tabs-items>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import UserAvatarPicker from '@/components/basic/picker/UserAvatarPicker'
import TeacherGeneralInfo from '@/modules/teacher/profile/TeacherGeneralInfo'

export default {
  components: {
    UserAvatarPicker,
    TeacherGeneralInfo,
  },
  props: {
    teacher: Object,
    edit: Boolean,
  },
  data() {
    return {
      tab: null,
    }
  },
  computed: {
    ...mapGetters('teacher', ['avatar']),
  },
  methods: {
    ...mapActions('teacher', ['removeTeacher']),
    resetValidation() {
      this.$refs.teacherGeneralFormEdit.resetValidation()
      this.$refs.teacherSchoolForm.resetValidation()
      this.$refs.teacherContactForm.resetValidation()
      this.$refs.teacherSpecializeForm.resetValidation()
    },
    async onSave() {
      await this.save()
    },
    save() {
      this.$refs.teacherGeneralInfo.save()
    },
    editController() {
      this.$emit('onEdit')
    },
    remove() {
      this.$dialog.confirm({
        title: 'Xóa Giáo Viên',
        text: `Bạn Có chắc muốn xóa giáo viên này.?`,
        okText: 'Có',
        cancelText: 'Không',
        done: async () => {
          await this.removeTeacher(this.teacher)
          this.$router.push(`/teachers/`)
        },
      })
    },
  },
}
</script>
<style scoped>
.can-click:hover {
  cursor: pointer;
}
</style>
