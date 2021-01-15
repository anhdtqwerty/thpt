<template>
  <v-row
    :no-gutters="$vuetify.breakpoint.smAndDown"
    class="px-md-3"
    v-if="student"
  >
    <v-col cols="12" md="3" class="d-flex justify-center">
      <user-avatar-picker :student="student" type="student" width="100%" />
    </v-col>
    <v-col class="" cols="12" md="9">
      <v-card :flat="$vuetify.breakpoint.smAndDown">
        <v-tabs v-model="tab" background-color="primary" dark>
          <v-tab :key="1">
            Tổng quan
          </v-tab>
          <v-tab :key="2">
            Địa chỉ
          </v-tab>
          <v-tab :key="3">
            Ghi chú
          </v-tab>
          <v-tab :key="4">
            Gia đình
          </v-tab>
        </v-tabs>

        <v-tabs-items v-model="tab">
          <v-tab-item :key="1">
            <v-card flat>
              <v-col cols="12" class="pa-4">
                <h3>1. Thông tin cơ bản</h3>
                <student-general-form-edit
                  ref="studentGeneralFormEdit"
                  :student="student"
                ></student-general-form-edit>
              </v-col>
              <v-col class="text-right">
                <v-btn depressed color="primary" @click="save">Lưu</v-btn>
              </v-col>
            </v-card>
          </v-tab-item>
          <v-tab-item :key="2">
            <v-card flat>
              <v-col cols="12" class="pa-4">
                <h3>2. Thông tin liên lạc</h3>
                <student-contact-form
                  :student="student"
                  ref="studentContactForm"
                ></student-contact-form>
              </v-col>
              <v-col class="text-right">
                <v-btn depressed color="primary" @click="save">Lưu</v-btn>
              </v-col>
            </v-card>
          </v-tab-item>
          <v-tab-item :key="3">
            <v-card flat>
              <v-col cols="12" class="pa-4" md="9">
                <h3>3. Ghi chú về học sinh</h3>
                <student-note-form
                  :student="student"
                  ref="studentNoteForm"
                ></student-note-form>
              </v-col>
              <v-col class="text-right">
                <v-btn depressed color="primary" @click="save">Lưu</v-btn>
              </v-col>
            </v-card>
          </v-tab-item>
          <v-tab-item :key="4">
            <v-card flat>
              <v-col cols="12" class="pa-4" md="12">
                <h3>4. Thông tin gia đình</h3>
                <student-family-form
                  :student="student"
                  ref="studentFamilyForm"
                ></student-family-form>
              </v-col>
              <v-col class="text-right">
                <v-btn depressed color="primary" @click="save">Lưu</v-btn>
              </v-col>
            </v-card>
          </v-tab-item>
        </v-tabs-items>
      </v-card>
    </v-col>
  </v-row>
</template>
<script>
import { mapActions } from 'vuex'
import StudentGeneralFormEdit from '@/components/basic/form/StudentGeneralFormEdit.vue'
import StudentContactForm from '@/components/basic/form/StudentContactForm.vue'
import StudentNoteForm from '@/components/basic/form/StudentNoteForm.vue'
import UserAvatarPicker from '@/components/basic/picker/UserAvatarPicker'
import StudentFamilyForm from '@/components/basic/form/StudentFamilyForm.vue'

export default {
  components: {
    StudentGeneralFormEdit,
    UserAvatarPicker,
    StudentContactForm,
    StudentNoteForm,
    StudentFamilyForm
  },
  props: {
    student: Object
  },
  data() {
    return {
      tab: null,
      dialog: true
    }
  },
  methods: {
    ...mapActions('student', ['updateStudent']),
    save() {
      const studentGeneralFormEdit = this.$refs.studentGeneralFormEdit.getData()
      const studentContactForm = this.$refs.studentContactForm.getData()
      const studentNoteForm = this.$refs.studentNoteForm.getData()
      const studentFamilyForm = this.$refs.studentFamilyForm.getData()

      this.updateStudent({
        id: this.student.id,
        name: studentGeneralFormEdit.name,
        phone: studentContactForm.phone,
        address: studentContactForm.currentLive,
        notes: studentNoteForm.notes,
        email: studentContactForm.email,
        gender: studentGeneralFormEdit.gender,
        dob: studentGeneralFormEdit.dob,
        data: {
          ...this.student.data,
          ...studentGeneralFormEdit,
          ...studentContactForm,
          ...studentFamilyForm,
          ...studentNoteForm
        }
      })
    }
  }
}
</script>

<style scoped>
.border {
  border: solod 1px lightgray;
  border-radius: 4px;
}
.info-student-general {
  width: 100%;
  text-align: left;
}
.info-student-general td:nth-child(1) {
  width: 70%;
}
.info-student-general td:nth-child(2) {
  font-weight: bold;
}
h3 {
  margin-bottom: 10px;
}
</style>
