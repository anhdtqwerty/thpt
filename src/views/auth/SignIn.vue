<template>
  <v-main class="fill-height pa-xs-0 d-flex align-center">
    <span class="auth-background hidden-sm-only hidden-xs-only"></span>
    <v-card class="pa-sm-auto mx-auto pa-xs-0 ma-xs-0" max-width="1024">
      <v-row no-gutters>
        <v-col
          xs="12"
          sm="12"
          md="5"
          lg="5"
          xl="5"
          style="background-color: #0D47A1"
          class="hidden-sm-and-down d-flex flex-column justify-end align-center py-16"
          justify="center"
        >
          <div class="px-sm-16">
            <v-img src="../../assets/logo.svg"></v-img>
            <v-img class="mt-n7" src="../../assets/sologan.svg"></v-img>
          </div>
        </v-col>

        <v-col class="white py-8" xs="12" sm="12" md="7" lg="7" xl="5">
          <div
            align="start"
            class="mx-sm-4 px-sm-4 mx-md-10 px-md-10 xs-screen"
          >
            <v-form ref="form">
              <div
                class="text-h3 text--darken-1 amber--text font-weight-bold pb-4 text-center"
              >
                Đăng nhập
              </div>
              <v-text-field
                label="Tài Khoản"
                name="login"
                prepend-icon="person"
                v-model="credentials.identifier"
                :rules="[$rules.required, $rules.minLength(4)]"
                validate-on-blur
                @keyup.enter="submit"
                type="text"
              />

              <v-text-field
                label="Mật Khẩu"
                v-model="credentials.password"
                :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                @click:append="showPassword = !showPassword"
                :type="showPassword ? 'text' : 'password'"
                :rules="[$rules.required, $rules.minLength(4)]"
                validate-on-blur
                @keyup.enter="submit"
                prepend-inner-icon="lock"
              />
            </v-form>
            <div class="py-4 text-center">
              <router-link
                :to="'/forgot-password'"
                class="font-italic text-decoration-none black--text"
                >Quên mật khẩu</router-link
              >
            </div>
            <v-divider />
            <v-card-actions
              class="d-flex flex-column justify-content-center py-8"
            >
              <v-btn
                color="#0D47A1"
                class="px-12 white--text"
                x-large
                @click="submit"
                >Đăng Nhập</v-btn
              >
              <p class="pt-2">
                Không có tài khoản?
                <router-link
                  :to="'/signup'"
                  class="font-weight-regular text-decoration-none pt-2 text--darken-1 amber--text"
                  >Đăng ký</router-link
                >
              </p>
            </v-card-actions>
          </div>
        </v-col>
      </v-row>
    </v-card>
  </v-main>
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
      showPassword: false,
      password: 'Password',
      rules: {
        min: v => v.length >= 6 || 'Min 6 characters',
        emailMatch: () => "The email and password you entered don't match"
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
