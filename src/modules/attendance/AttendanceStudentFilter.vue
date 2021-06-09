<template>
  <v-form>
    <v-row class="pa-2">
      <v-col cols="12" md="10">
        <v-row>
          <v-col cols="12" md="4">
            <AutocompleteGrade clearable dense outlined label="Khối" hide-details @change="grade = $event" />
          </v-col>
          <v-col cols="12" md="4" v-bind="$attrs">
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
          <v-col cols="12" md="4">
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
      <v-col cols="12" md="2">
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

export default {
  components: { AutocompleteClass, AutocompleteGrade },
  data() {
    return {
      classData: '',
      status: '',
      grade: ''
    }
  },
  computed: {
    ...mapState('constant', ['attendanceStatus']),
    gradeId() {
      return { grade: this.grade }
    }
  },
  methods: {
    onFilterChanged() {
      this.$emit('onFilterChanged', {
        'class.grade': this.grade,
        status: this.status,
        class: this.classData ? this.classData.id : ''
      })
    },
    change(data) {
      this.student = data
    }
  }
}
</script>

<style></style>
