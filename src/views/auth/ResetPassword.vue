<template>
  <v-main class="fill-height pa-xs-0 d-flex align-center" height="100%">
    <span class="auth-background hidden-sm-only hidden-xs-only"></span>
    <v-card class="pa-sm-auto mx-auto pa-xs-0 ma-xs-0" max-width="1024">
      <v-row no-gutters>
        <v-col
          xs="12"
          sm="12"
          md="5"
          lg="5"
          xl="5"
          class="hidden-sm-and-down d-flex flex-column justify-end align-center py-16"
          justify="center"
          style="background-color: white"
        >
          <div class="px-sm-16">
            <v-img width="250px" src="../../assets/logo.svg"></v-img>
          </div>
        </v-col>

        <v-col class="white py-8" xs="12" sm="12" md="7" lg="7" xl="7">
          <div align="start" class="pa-12">
            <v-form ref="form" class="mx-6">
              <h1 class="pb-12">Đặt lại mật khẩu</h1>
              <subtitle-1>Mật khẩu mới</subtitle-1>
              <v-text-field
                v-model="password"
                :type="newPassword ? 'text' : 'password'"
                :append-icon="newPassword ? 'mdi-eye' : 'mdi-eye-off'"
                :rules="[$rules.required, $rules.minLength(4), $rules.min]"
                @click:append="newPassword = !newPassword"
                validate-on-blur
              />
              <subtitle-1>Nhập lại mật khẩu</subtitle-1>
              <v-text-field
                v-model="passwordConfirmation"
                :append-icon="checkPassword ? 'mdi-eye' : 'mdi-eye-off'"
                @click:append="checkPassword = !checkPassword"
                :type="checkPassword ? 'text' : 'password'"
                :rules="[$rules.required, $rules.minLength(4), passwordConfirmationRule]"
                validate-on-blur
                @keyup.enter="submit"
              />
            </v-form>
            <div align="center" justify="center" class="pt-4">
              <v-btn color="#0D47A1" class="px-12 white--text" x-large @click="submit">Thay đổi</v-btn>
            </div>
          </div>
        </v-col>
      </v-row>
    </v-card>
  </v-main>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  data: () => ({
    code: '',
    password: '',
    passwordConfirmation: '',
    newPassword: false,
    checkPassword: false,
    rules: {
      min: v => v.length >= 6 || 'Min 6 characters',
      emailMatch: () => "The email and password you entered don't match"
    }
  }),
  created() {
    this.code = this.$route.query.code
  },
  methods: {
    ...mapActions('auth', ['resetPassword']),
    async submit() {
      if (this.$refs.form.validate()) {
        const { code, password, passwordConfirmation } = this
        await this.resetPassword({ code, password, passwordConfirmation })
      }
    }
  },
  computed: {
    passwordConfirmationRule() {
      return this.password === this.passwordConfirmation || 'Không chính xác'
    }
  }
}
</script>
<style scoped>
.auth-background {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background: url('../../assets/background.svg') no-repeat center center;
  background-size: cover;
  transform: scale(1);
}
@media screen and (max-width: 600px) {
  .xs-screen {
    padding: 20px;
  }
}
</style>
