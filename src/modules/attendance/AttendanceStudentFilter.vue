<template>
  <v-form>
    <v-row class="pa-2">
      <v-col cols="12">
        <v-row>
          <v-col cols="12" md="3">
            <AutocompleteGrade clearable dense outlined label="Khối" hide-details @change="grade = $event" />
          </v-col>
          <v-col cols="12" md="3" v-bind="$attrs">
            <AutocompleteClass
              clearable
              v-model="classData"
              dense
              outlined
              label="Lớp"
              hide-details
              :filter="gradeId"
            />
          </v-col>
          <v-col cols="12" md="3">
            <AutocompleteStudent
              :syncedValue.sync="student"
              clearable
              clear-icon="mdi-close"
              outlined
              label="Học sinh"
              dense
              deletable-chips
              :filter="currentClassId"
              hide-details
              item-text="display"
              item-value="id"
            />
          </v-col>
          <v-col cols="12" md="3">
            <v-select
              v-model="status"
              :items="attendanceStatus"
              item-text="title"
              item-value="status"
              dense
              outlined
              label="Trạng thái"
              hide-details
              clearable
            />
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="12" class="d-flex justify-end">
        <v-btn height="40" color="#0D47A1" outlined @click="onFilterChanged">
          Tìm kiếm
        </v-btn>
      </v-col>
    </v-row>
  </v-form>
</template>

<script>
import AutocompleteGrade from '@/components/basic/input/AutocompleteGrade'
import AutocompleteClass from '@/components/basic/input/AutocompleteClass'
import { mapState } from 'vuex'
import { get } from 'lodash'
import AutocompleteStudent from '@/components/basic/input/AutocompleteStudent.vue'

export default {
  components: { AutocompleteClass, AutocompleteGrade, AutocompleteStudent },
  data() {
    return {
      classData: '',
      status: '',
      grade: '',
      student: null
    }
  },
  computed: {
    ...mapState('constant', ['attendanceStatus']),
    gradeId() {
      return { grade: this.grade }
    },
    currentClassId() {
      return { currentClass: get(this.classData, 'id') }
    }
  },
  methods: {
    onFilterChanged() {
      this.$emit('onFilterChanged', {
        grade: this.grade,
        status: this.status,
        class: this.classData ? this.classData : {},
        student: this.student.id
      })
    }
  }
}
</script>

<style></style>
