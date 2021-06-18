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
          style="background-color: #0D47A1"
          class="hidden-sm-and-down d-flex flex-column justify-end align-center py-16"
          justify="center"
        >
          <div class="px-sm-16">
            <v-img width="250px" src="../../assets/logo.svg"></v-img>
          </div>
        </v-col>

        <v-col class="white py-8" xs="12" sm="12" md="7" lg="7" xl="7">
          <div align="start" class="mx-sm-4 px-sm-4 mx-md-10 px-md-10 xs-screen">
            <v-form ref="form" class="mx-4">
              <div class="text-h3 text--darken-1 amber--text font-weight-bold text-center py-5">
                Đăng ký
              </div>
              <p class="text-subtitle-1">
                Chúng tôi đã gửi cho bạn một mã bảo mật. Vui lòng kiểm tra email để xác nhận
              </p>
              <br />
              <p class="text-subtitle-1">Nhập mã bảo mật</p>
              <v-text-field
                v-model="credentials.identifier"
                :rules="[$rules.required, $rules.minLength(4)]"
                validate-on-blur
                @keyup.enter="submit"
                type="text"
              />
            </v-form>
            <v-card-actions class="d-flex flex-column justify-content-center pt-8 pb-16">
              <v-btn color="#0D47A1" class="px-12 white--text" x-large @click="submit">Xác Nhận</v-btn>
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
