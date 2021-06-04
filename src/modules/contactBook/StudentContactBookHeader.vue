<template>
  <v-card elevation="0" outlined class="mt-4">
    <v-row class="py-5 px-4" no-gutters>
      <v-col class="d-flex flex-column" cols="10">
        <v-row no-gutters class="flex-column">
          <p class="text-h5 primary--text mb-0">{{ student.name }}</p>
          <p class="text-subtitle-2">{{ student.code | getStudentCode }}</p>
        </v-row>
        <v-row>
          <v-col cols="2" class="py-2 d-flex flex-column justify-end">
            <p class="text-caption mb-0">Ngày sinh</p>
            <p class="text-subtitle-2 mb-0">
              {{ student.dob | ddmmyyyy }}
            </p>
          </v-col>
          <v-col cols="2" class="py-2 d-flex flex-column justify-end">
            <p class="text-caption mb-0">Lớp</p>
            <router-link
              style="text-decoration: none"
              :to="'/class/' + (student.currentClass && student.currentClass.id)"
            >
              <span v-if="student.currentClass">{{ student.currentClass && student.currentClass.title }}</span>
            </router-link>
          </v-col>
          <v-col cols="3" class="py-2 d-flex flex-column justify-end">
            <p class="text-caption mb-0">Bố / Người giám hộ</p>
            <p class="text-subtitle-2 mb-0">
              {{ `${this.student.data.dadName} / ${this.student.data.dadPhone}` }}
            </p>
          </v-col>
          <v-col cols="3" class="py-2 d-flex flex-column justify-end">
            <p class="text-caption mb-0">Mẹ / Người giám hộ</p>
            <p class="text-subtitle-2 mb-0">
              {{ `${this.student.data.momName} / ${this.student.data.momPhone}` }}
            </p>
          </v-col>
          <v-col cols="2" class="py-2 d-flex flex-column justify-end">
            <div>
              <p class="text-caption mb-0">Trạng thái</p>
              <v-chip small class="white--text" v-if="student.status" :color="student.status | statusColor" label>
                {{ student.status | status }}
              </v-chip>
            </div>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
export default {
  components: {},
  data() {
    return {}
  },

  props: {
    student: Object
  }
}
</script>

<style lang="css" scoped></style>
