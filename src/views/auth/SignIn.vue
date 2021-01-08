<template>
<v-main :class="{ 'auth-background': !$vuetify.breakpoint.xs }" >
  <v-container class="pa-0" :class="{ 'elevation-1': !$vuetify.breakpoint.xs }" style="max-width:1000px;">
    <v-row>
      <v-col
        style="background: #0D47A1;"
        cols="12"
        md="5"
        class="logo"
      >
        <div class="py-16">
                    <v-img width="250px" src="../../assets/logo.svg"></v-img>
        </div>
      </v-col>

      <v-col style="background: #fff" cols="12" md="7">
        <div class="mx-sm-4 px-sm-4 mx-md-10 px-md-10 py-lg-16 xs-screen">
          <v-form ref="form">
            <div class="d-flex justify-center">
              <div class="text-h4 py-5 font-weight-bold" style="color: #0D47A1">
                Đăng nhập
              </div>
            </div>
            <v-text-field
              
              placeholder="Tài Khoản"
              name="login"
              prepend-inner-icon="person"
              v-model="credentials.identifier"
              :rules="[$rules.required, $rules.minLength(4)]"
              validate-on-blur
              @keyup.enter="submit"
              type="text"
              color="#0D47A1"
            />

            <v-text-field
              
              placeholder="Mật khẩu"
              v-model="credentials.password"
              :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
              @click:append="showPassword = !showPassword"
              :type="showPassword ? 'text' : 'password'"
              :rules="[$rules.required, $rules.minLength(4)]"
              validate-on-blur
              @keyup.enter="submit"
              prepend-inner-icon="lock"
              color="#0D47A1"
            />
          </v-form>
          <div class="d-flex justify-center py-3">
            <router-link
              :to="'/forgot-password'"
              class="font-italic text-decoration-none black--text"
              >Quên mật khẩu</router-link
            >
          </div>
          <v-divider class="#0D47A1" />
          <v-card-actions
            class="d-flex flex-column justify-content-center py-10"
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
              <router-link class="blue--text text-decoration-none" :to="'/signup'"
                >Đăng ký</router-link
              >
            </p>
          </v-card-actions>
        </div>
      </v-col>
    </v-row>
  </v-container>
</v-main>

</template>
<script>
import { mapActions } from 'vuex'
export default {
  data() {
    return {
      credentials: {
        identifier: '',
        password: '',
      },
      loading: false,
      showPassword: false,
      password: 'Password',
      rules: {
        min: (v) => v.length >= 6 || 'Min 6 characters',
        emailMatch: () => "The email and password you entered don't match",
      },
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
    },
  },
}
</script>
<style scoped>
.auth-background {
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background: url('../../assets/background.svg') no-repeat center center;
  background-size: cover;
  transform: scale(1);
  overflow: hidden;
}
.logo{
  display: flex;
  align-items: flex-end;
  justify-content: center;
}
@media screen and (max-width: 600px) {
  .xs-screen {
    padding: 20px;
  }
}
</style>

