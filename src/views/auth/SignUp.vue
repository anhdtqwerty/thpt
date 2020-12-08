<template>
  <div
    class="fill-height pa-xs-0 d-flex align-center container-fluid"
    style="height:100vh; overflow-x:hidden"
  >
    <span class="auth-background hidden-sm-only hidden-xs-only"></span>
    <v-card class="pa-sm-auto mx-auto pa-xs-0 ma-xs-0" max-width="1024">
      <v-row no-gutters>
        <v-col
          xs="12"
          sm="12"
          md="5"
          lg="5"
          xl="5"
          style="background-color: #0D47A1" class="hidden-sm-and-down d-flex flex-column justify-end align-center py-16"
          justify="center"
        >
          <div class="px-sm-16">
            <v-img src="../../assets/logo.svg"></v-img>
            <v-img class="mt-n7" src="../../assets/sologan.svg"></v-img>
          </div>
        </v-col>

        <v-col class="white py-8" xs="12" sm="12" md="7" lg="7" xl="7">
          <div
            align="start"
            class="mx-sm-4 px-sm-4 mx-md-10 px-md-10 xs-screen"
          >
            <v-form ref="form">
              <div
                class="text-h3 text--darken-1 amber--text font-weight-bold text-center pb-4"
              >
                Đăng ký
              </div>
              <v-text-field
                label="Tên đăng nhập"
                prepend-inner-icon="person"
                v-model="credentials.identifier"
                :rules="[$rules.required, $rules.minLength(4)]"
                validate-on-blur
                @keyup.enter="submit"
                type="text"
              />

              <v-text-field
                label="Nhập email của bạn"
                prepend-inner-icon="email"
                v-model="email"
                :rules="[$rules.required, $rules.email]"
                validate-on-blur
                @keyup.enter="submit"
                type="text"
              />

              <v-text-field
                label="Mật Khẩu"
                v-model="password"
                :append-icon="newPassword ? 'mdi-eye' : 'mdi-eye-off'"
                :type="newPassword ? 'text' : 'password'"
                :rules="[$rules.required, $rules.minLength(4)]"
                @keyup.enter="submit"
                @click:append="newPassword = !newPassword"
                prepend-inner-icon="lock"
                validate-on-blur
              />

              <v-text-field
                label="Nhập lại mật khẩu"
                v-model="passwordConfirmation"
                :append-icon="checkPassword ? 'mdi-eye' : 'mdi-eye-off'"
                :type="checkPassword ? 'text' : 'password'"
                :rules="[$rules.required, $rules.minLength(4)]"
                validate-on-blur
                prepend-inner-icon="lock"
                @keyup.enter="submit"
                @click:append="checkPassword = !checkPassword"
              />
            </v-form>

            <v-card-actions
              class="d-flex flex-column justify-content-center pt-6"
            >
              <v-btn
                href="/confirm-email"
                color="#0D47A1"
                class="px-12 white--text"
                x-large
                @click="submit"
                >Đăng Ký</v-btn
              >
            </v-card-actions>
          </div>
        </v-col>
      </v-row>
    </v-card>
  </div>
</template>
<script>
import { mapActions } from 'vuex'
export default {
  data() {
    return {
      credentials: {
        identifier: '',
        password: ''
      },
      loading: false,
      newPassword: false,
      checkPassword: false,
      password: 'Password',
      rules: {
        min: v => v.length >= 6 || 'Min 6 characters'
      }
    }
  },
  methods: {
    ...mapActions('auth', ['signIn']),
    async submit() {
      if (this.$refs.form.validate()) {
        this.loading = true
        await this.signIn(this.credentials)
        this.loading = false
      }
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
