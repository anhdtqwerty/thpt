<template>
  <v-form>
    <v-row>
      <v-col cols="12" md="9">
        <v-row>
          <v-col cols="12" md="4" v-bind="$attrs">
            <autocomplete-class
              clearable
              v-model="classes"
              dense
              outlined
              label="Lớp"
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
              clearable
            />
          </v-col>
          <v-col cols="12" md="4">
            <autocomplete-student
              clearable
              v-model="student"
              dense
              outlined
              label="Tên học sinh"
              @change="change"
            />
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="12" md="3">
        <v-btn height="40" color="#0D47A1" outlined @click="onFilterChanged">
          <v-icon left dark>mdi-filter-outline</v-icon>Lọc
        </v-btn>
      </v-col>
    </v-row>
  </v-form>
</template>

<script>
import AutocompleteStudent from '@/components/basic/input/AutocompleteStudent'
import AutocompleteClass from '@/components/basic/input/AutocompleteClass'
import { mapState } from 'vuex'

export default {
  components: { AutocompleteClass, AutocompleteStudent },
  data() {
    return {
      classes: '',
      status: '',
      student: '',
    }
  },
  computed: {
    ...mapState('constant', ['attendanceStatus']),
  },
  methods: {
    onFilterChanged() {
      this.$emit('onFilterChanged', {
        student: this.student ? this.student.id : '',
        status: this.status,
        class: this.classes ? this.classes.id : '',
      })
    },
    change(data) {
      this.student = data
    },
  },
}
</script>

<style>
</style>
