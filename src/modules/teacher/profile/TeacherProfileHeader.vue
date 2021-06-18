<template>
  <v-card elevation="0" outlined>
    <v-row class="py-5 px-6" no-gutters>
      <v-col class="d-flex align-center" cols="2">
        <UserAvatarPicker :user="teacher" type="staff" />
      </v-col>
      <v-col class="d-flex flex-column" cols="8">
        <v-row no-gutters class="flex-column" style="height:100%">
          <p class="text-h5 primary--text mb-0">{{ teacher.name }}</p>
          <p class="grey--text">{{ teacher.code }}</p>
        </v-row>
        <v-row class="my-0">
          <v-col cols="2.5" class="d-flex flex-column py-0">
            <p class="grey--text mb-0">Lĩnh vực</p>
            <p class="mb-0">{{ teacher | _get('subjectGroup.title') }}</p>
          </v-col>
          <v-col cols="2.5" class="d-flex flex-column  py-0">
            <p class="grey--text mb-0">Loại cán bộ</p>
            <p class="mb-0">
              {{ teacher.type | teacherType }}
            </p>
          </v-col>
          <v-col cols="2.5" class="d-flex flex-column  py-0">
            <p class="grey--text mb-0">Số điện thoại</p>
            <p class="mb-0">
              {{ teacher.phone }}
            </p>
          </v-col>
          <v-col cols="4.5" class="d-flex flex-column  py-0">
            <p class="grey--text mb-0">Email</p>
            <p class="mb-0">
              {{ teacher.email }}
            </p>
          </v-col>
        </v-row>
      </v-col>
      <v-col class="d-flex align-end justify-end" cols="2">
        <v-btn @click="detailState = !detailState" medium color="primary" outlined>Hồ sơ chi tiết</v-btn>
      </v-col>
    </v-row>

    <TeacherProfileDetailDialog :state="detailState" @edit="editState = !editState" />
    <TeacherEditDialog :state="editState" />
  </v-card>
</template>

<script>
import UserAvatarPicker from '@/components/basic/picker/UserAvatarPicker'
import TeacherProfileDetailDialog from '@/modules/teacher/TeacherProfileDetailDialog'
import TeacherEditDialog from '@/modules/teacher/TeacherEditDialog'
import { mapState } from 'vuex'
export default {
  components: {
    TeacherProfileDetailDialog,
    UserAvatarPicker,
    TeacherEditDialog
  },
  data() {
    return {
      detailState: false,
      editState: false
    }
  },
  computed: {
    ...mapState('teacher', ['teacher'])
  }
}
</script>

<style lang="css" scoped></style>
