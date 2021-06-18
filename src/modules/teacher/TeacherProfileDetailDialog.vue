<template>
  <v-dialog :fullscreen="$vuetify.breakpoint.smAndDown" v-model="dialog" width="620" height="600" scrollable>
    <v-card>
      <v-card-title class="primary white--text">
        Hồ sơ chi tiết giáo viên
        <v-spacer></v-spacer>
        <v-btn dark icon>
          <v-icon @click="cancel">close</v-icon>
        </v-btn>
      </v-card-title>
      <v-divider />
      <v-card-text>
        <v-form ref="form" class="py-4">
          <TeacherGeneralFormView class="mb-6" readonly />
          <TeacherSchoolFormView class="mb-6" readonly />
          <TeacherContactFormView class="mb-6" readonly />
          <TeacherSpecializeFormView class="mb-6" readonly />
          <TeacherNoteFormView class="mb-6" readonly />
        </v-form>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn @click="editState" class="ma-2" outlined color="#0D47A1">Sửa hồ sơ giáo viên</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import TeacherGeneralFormView from '@/components/basic/form/TeacherGeneralFormView.vue'
import TeacherContactFormView from '@/components/basic/form/TeacherContactFormView.vue'
import TeacherNoteFormView from '@/components/basic/form/TeacherNoteFormView.vue'
import TeacherSpecializeFormView from '@/components/basic/form/TeacherSpecializeFormView.vue'
import TeacherSchoolFormView from '@/components/basic/form/TeacherSchoolFormView.vue'
import { mapState } from 'vuex'

export default {
  components: {
    TeacherGeneralFormView,
    TeacherContactFormView,
    TeacherNoteFormView,
    TeacherSpecializeFormView,
    TeacherSchoolFormView
  },
  props: {
    state: Boolean
  },
  data() {
    return {
      dialog: false
    }
  },
  computed: {
    ...mapState('teacher', ['teacher'])
  },
  methods: {
    cancel() {
      this.dialog = false
    },
    editState() {
      this.$emit('edit')
      this.dialog = false
    }
  },
  watch: {
    state(state) {
      this.dialog = true
    }
  }
}
</script>

<style></style>
