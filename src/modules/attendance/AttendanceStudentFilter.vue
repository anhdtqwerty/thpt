<template>
  <v-form>
    <v-row class="pa-2">
      <v-col cols="12" md="10">
        <v-row>
          <v-col cols="12" md="4">
            <autocomplete-grade clearable dense outlined label="Khối" hide-details @change="grade = $event" />
          </v-col>
          <v-col cols="12" md="4" v-bind="$attrs">
            <autocomplete-class clearable v-model="classes" dense outlined label="Lớp" hide-details :filter="gradeId" />
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
      classes: '',
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
        grade: this.grade ? this.grade.id : '',
        status: this.status,
        class: this.classes ? this.classes.id : ''
      })
    },
    change(data) {
      this.student = data
    }
  }
}
</script>

<style></style>
