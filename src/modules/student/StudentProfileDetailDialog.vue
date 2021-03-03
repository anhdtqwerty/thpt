<template>
  <v-dialog
    :fullscreen="$vuetify.breakpoint.smAndDown"
    v-model="dialog"
    width="600"
    height="600"
    scrollable
  >
    <v-card>
      <v-card-title class="primary white--text">
        Hồ sơ chi tiết
        <v-spacer></v-spacer>
        <v-btn dark icon>
          <v-icon @click="cancel">close</v-icon>
        </v-btn>
      </v-card-title>
      <v-divider />
      <v-card-text>
        <v-form ref="form" class="py-4">
          <student-general-form-view
            class="mb-6"
            :student="student"
            readonly
          ></student-general-form-view>
          <student-contact-form-view
            class="mb-6"
            :student="student"
            readonly
          ></student-contact-form-view>
          <student-note-form-view
            class="mb-6"
            :student="student"
            readonly
          ></student-note-form-view>
          <student-family-form-view
            class="mb-6"
            :student="student"
            readonly
          ></student-family-form-view>
        </v-form>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn class="ma-2" outlined color="#0D47A1">Sửa học sinh</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import StudentGeneralFormView from '@/components/basic/form/StudentGeneralFormView.vue'
import StudentContactFormView from '@/components/basic/form/StudentContactFormView.vue'
import StudentNoteFormView from '@/components/basic/form/StudentNoteFormView.vue'
import StudentFamilyFormView from '@/components/basic/form/StudentFamilyFormView.vue'

export default {
  components: {
    StudentGeneralFormView,
    StudentContactFormView,
    StudentNoteFormView,
    StudentFamilyFormView,
  },
  props: {
    state: Boolean,
    student: Object,
  },
  data() {
    return {
      dialog: false,
    }
  },
  methods: {
    cancel() {
      this.dialog = false
    },
  },
  watch: {
    state(state) {
      this.dialog = true
    },
  },
}
</script>

<style>
</style>
