<template>
  <v-card elevation="0" outlined>
    <v-row class="py-5 px-6" no-gutters>
      <v-col class="d-flex align-center" cols="2">
        <UserAvatarPicker :student="student" type="student" />
      </v-col>
      <v-col class="d-flex flex-column" cols="8">
        <v-row no-gutters class="flex-column">
          <p class="text-h5 primary--text mb-0">{{ student.name }}</p>
          <p class="text-subtitle-2">{{ student.code | getStudentCode }}</p>
        </v-row>
        <v-row>
          <v-col cols="2" class="py-2 d-flex flex-column justify-end">
            <p class="text-caption mb-0">Lớp</p>
            <router-link
              style="text-decoration: none"
              :to="'/class/' + (student.currentClass && student.currentClass.id)"
            >
              <span v-if="student.currentClass">{{ student.currentClass && student.currentClass.title }}</span>
            </router-link>
          </v-col>
          <v-col cols="4" class="py-2 d-flex flex-column justify-end">
            <p class="text-caption mb-0">Bố / Người giám hộ</p>
            <p class="text-subtitle-2 mb-0">
              {{ `${this.student.data.dadName} / ${this.student.data.dadPhone}` }}
            </p>
          </v-col>
          <v-col cols="4" class="py-2 d-flex flex-column justify-end">
            <p class="text-caption mb-0">Mẹ / Người giám hộ</p>
            <p class="text-subtitle-2 mb-0">
              {{ `${this.student.data.momName} / ${this.student.data.momPhone}` }}
            </p>
          </v-col>
        </v-row>
      </v-col>
      <v-col class="d-flex align-end justify-end" cols="2">
        <v-btn @click="detailState = !detailState" small color="primary" outlined>Hồ sơ chi tiết</v-btn>
      </v-col>
    </v-row>

    <student-profile-detail-dialog @edit="editState = !editState" :student="student" :state="detailState" />
    <student-edit-dialog :student="student" :state="editState" />
  </v-card>
</template>

<script>
import UserAvatarPicker from '@/components/basic/picker/UserAvatarPicker'
import StudentProfileDetailDialog from '@/modules/student/StudentProfileDetailDialog'
import StudentEditDialog from '@/modules/student/StudentEditDialog'

export default {
  components: {
    StudentProfileDetailDialog,
    StudentEditDialog,
    UserAvatarPicker
  },
  data() {
    return {
      detailState: false,
      editState: false
    }
  },

  props: {
    student: Object
  }
}
</script>

<style lang="css" scoped></style>
