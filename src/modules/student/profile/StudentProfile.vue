<template>
  <v-row
    :no-gutters="$vuetify.breakpoint.smAndDown"
    class="px-md-2 mx-md-0"
    v-if="student"
  >
    <v-col cols="12" md="3" class="d-flex justify-center">
      <user-avatar-picker :student="student" type="student" width="100%" />
    </v-col>
    <v-col class="" cols="12" md="9">
      <v-card :flat="$vuetify.breakpoint.smAndDown">
        <v-tabs v-model="tab" background-color="primary" dark>
          <v-tab :key="1"> Hồ sơ </v-tab>
          <!-- <v-tab :key="2"> Địa chỉ </v-tab>
          <v-tab :key="3"> Ghi chú </v-tab>
          <v-tab :key="4"> Gia đình </v-tab> -->
        </v-tabs>

        <v-tabs-items v-model="tab">
          <v-tab-item :key="1">
            <v-card flat>
              <v-col cols="12" class="px-4 py-0">
                <div class="d-flex justify-space-between">
                  <h3 class="ma-0 pt-3">1. Thông tin cơ bản</h3>
                  <v-btn
                    v-if="!edit"
                    class="my-2"
                    depressed
                    color="success"
                    @click="edit = !edit"
                    >Sửa</v-btn
                  >
                  <v-btn
                    v-else
                    depressed
                    class="my-2"
                    color="primary"
                    @click="onSave"
                    >Lưu</v-btn
                  >
                </div>
                <student-general-form-edit
                  ref="studentGeneralFormEdit"
                  :student="student"
                  :readonly="!edit"
                ></student-general-form-edit>
                <h3>2. Thông tin liên lạc</h3>
                <student-contact-form
                  :student="student"
                  ref="studentContactForm"
                  :readonly="!edit"
                ></student-contact-form>
                <h3>3. Ghi chú về học sinh</h3>
                <student-note-form
                  :student="student"
                  ref="studentNoteForm"
                  :readonly="!edit"
                ></student-note-form>
                <h3>4. Thông tin gia đình</h3>
                <student-family-form
                  :student="student"
                  ref="studentFamilyForm"
                  :readonly="!edit"
                ></student-family-form>
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
    StudentFamilyForm,
  },
  props: {
    student: Object,
  },
  data() {
    return {
      tab: null,
      dialog: true,
      edit: false,
    }
  },
  methods: {
    ...mapActions('student', ['updateStudent', 'removeStudent']),
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
          ...studentNoteForm,
        },
      })
    },
    async onSave() {
      await this.save()
      this.edit = !this.edit
    },
    remove() {
      // this.$dialog.confirm({
      //   title: 'Xóa Học Sinh',
      //   text: 'Bạn Có chắc muốn xóa học sinh này.?',
      //   okText: 'Có',
      //   cancelText: 'Không',
      //   done: asyn`c () => {
      //     await this.removeStudent(this.student)
      //   }
      // })
      console.log(this.student)
    },
  },
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
