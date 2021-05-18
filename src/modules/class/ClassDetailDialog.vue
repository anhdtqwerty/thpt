<template>
  <v-dialog :fullscreen="$vuetify.breakpoint.smAndDown" v-model="dialog" width="600" height="600" scrollable>
    <v-card v-if="classData.id">
      <v-card-title class="primary white--text">
        Hồ SƠ CHI TIẾT LỚP
        <v-spacer></v-spacer>
        <v-btn dark icon>
          <v-icon @click="dialog = false">close</v-icon>
        </v-btn>
      </v-card-title>
      <v-divider />
      <v-card-text>
        <v-row class="mt-4">
          <v-col class="py-0 pr-14" cols="12">
            <v-row>
              <v-col class="d-flex align-center py-0" cols="12">
                <v-subheader class="px-0">Tên lớp</v-subheader>
                <p class="mb-0">{{ classData.title }}</p>
              </v-col>
              <v-col class="d-flex align-center py-0" cols="12">
                <v-subheader class="px-0">Khối</v-subheader>
                <p class="mb-0">{{ classData.grade.title }}</p>
              </v-col>
              <v-col class="d-flex align-center py-0" cols="12">
                <v-subheader class="px-0">Ban</v-subheader>
                <p class="mb-0">{{ classData.division.title }}</p>
              </v-col>
              <v-col class="d-flex align-center py-0" cols="12">
                <v-subheader class="px-0">Niên khóa</v-subheader>
                <p class="mb-0"></p>
              </v-col>
              <v-col class="d-flex align-center py-0" cols="12">
                <v-subheader class="px-0">GVCN</v-subheader>
                <p class="mb-0">{{ classData.teachers | getTeacher }}</p>
              </v-col>
              <v-col class="d-flex align-center py-0" cols="12">
                <v-subheader class="px-0">Sĩ số</v-subheader>
                <p class="mb-0">{{ getStudentCount }}</p>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn @click="editState" class="ma-2" outlined color="#0D47A1">Sửa hồ sơ lớp</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { get } from 'lodash'
export default {
  components: {},
  props: {
    state: Boolean,
    classData: Object
  },
  data() {
    return {
      dialog: false
    }
  },
  methods: {
    editState() {
      this.$emit('edit')
      this.dialog = false
    }
  },
  computed: {
    getStudentCount() {
      return get(this.classData.students, 'length', 0)
    }
  },
  watch: {
    state(state) {
      this.dialog = true
    }
  },
  filters: {
    getTeacher(data) {
      if (!data || !data.length) return 'không có'
      else return data[0].name
    }
  }
}
</script>

<style>
p {
  color: black;
}
.v-subheader {
  width: 30%;
}
</style>
