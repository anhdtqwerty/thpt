<template>
  <div>
    <div class="pa-4 d-none d-flex align-center">
      <div>
        <Breadcrumbs
          :headline="'Sổ Liên Lạc'"
          :link="[
            { text: 'Sổ liên lạc', href: '../contact-book' },
            { text: student ? student.name : 'Học sinh' }
          ]"
        />
      </div>
      <v-spacer />
      <v-btn color="primary" @click="save"
        ><v-icon class="mr-2">mdi-content-save</v-icon>Lưu</v-btn
      >
    </div>
    <v-card :flat="$vuetify.breakpoint.smAndDown" class="mx-4">
      <v-tabs v-model="tab">
        <v-tab :key="1">
          Tổng quan
        </v-tab>
        <v-tab :key="2">
          Liên Lạc
        </v-tab>
        <v-tab :key="3">
          Đổi Mật Khẩu
        </v-tab>
      </v-tabs>

      <v-tabs-items v-model="tab">
        <v-tab-item :key="1">
          <v-card flat v-if="student">
            <v-col cols="12" class="pa-6">
              <h3>{{ student.name }}</h3>
              <p>Lớp: {{ student.classes[0].title }}</p>
              <p>{{ student.generation.name }}</p>
              <div class="d-flex">
                <v-checkbox
                  v-model="isSms"
                  label="SMS"
                  class="mr-6"
                ></v-checkbox>
                <v-checkbox v-model="isApp" label="App"></v-checkbox>
              </div>
            </v-col>
          </v-card>
        </v-tab-item>
        <v-tab-item :key="2">
          <v-card flat>
            <v-col cols="12" class="pa-6" md="6">
              <login-info-form
                ref="loginInfoForm"
                :student="student"
              ></login-info-form>
            </v-col>
          </v-card>
        </v-tab-item>
        <v-tab-item :key="3">
          <v-card flat>
            <v-col cols="12" class="pa-6" md="6">
              <PasswordForm ref="passwordForm" />
            </v-col>
          </v-card>
        </v-tab-item>
      </v-tabs-items>
    </v-card>
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import Breadcrumbs from '@/components/layout/Breadcrumbs'
import LoginInfoForm from '@/components/basic/form/LoginInfoForm'
import PasswordForm from '@/components/basic/form/PasswordForm.vue'
export default {
  components: {
    Breadcrumbs,
    LoginInfoForm,
    PasswordForm
  },
  computed: {
    ...mapGetters('student', ['student'])
  },
  data() {
    return {
      tab: null
    }
  },
  async created() {
    this.refresh()
  },
  methods: {
    ...mapActions('student', ['updateStudent', 'fetchStudent']),
    async refresh() {
      await this.fetchStudent(this.$route.params.id)
    },
    resetValidation() {
      this.$refs.form.resetValidation()
    },
    save(data) {
      if (!this.$refs.loginInfoFor.validate()) return
      const loginInfoForm = this.$refs.loginInfoForm.getData()
      // this.updateStudent({
      //   id: this.student.id,
      //   contact: {
      //     ...this.student.contact,
      //     ...loginInfoForm
      //   }
      // })
    }
  }
}
</script>
