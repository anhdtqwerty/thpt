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
          style="background-color: white"
          class="hidden-sm-and-down d-flex flex-column justify-end align-center py-16"
          justify="center"
        >
          <div class="px-sm-16">
            <v-img width="250px" src="../../assets/logo.svg"></v-img>
          </div>
        </v-col>

        <v-col class="white py-8" xs="12" sm="12" md="7" lg="7" xl="7">
          <div align="start" class="pa-12">
            <v-form ref="form" class="mx-5">
              <h1 class="mx-2">Quên mật khẩu ?</h1>
              <p class="py-4 mx-2">
                Nhập địa chỉ email của bạn, chúng tôi sẽ gửi tới bạn liên kết để đặt lại mật khẩu
              </p>
              <v-text-field
                class="py-4 mx-2"
                label="Nhập email của bạn"
                prepend-inner-icon="email"
                v-model="email"
                :rules="[$rules.required, $rules.email]"
                validate-on-blur
                @keyup.enter="submit"
                type="text"
                outlined
              />
            </v-form>
            <div align="center" justify="center">
              <v-btn href="/reset-password" color="#0D47A1" class="px-12 white--text" x-large @click="submit"
                >Tiếp theo</v-btn
              >
              <router-link :to="'/signin'" class="d-block mt-2 mb-3 text-decoration-none" style="color:#0D47A1"
                >Quay lại đăng nhập</router-link
              >
            </div>
          </div>
        </v-col>
      </v-row>
      <!-- </v-card> -->
    </v-card>
  </v-main>
</template>
<script>
import { mapActions } from 'vuex'
export default {
  data: () => ({
    email: '',
    done: false
  }),
  methods: {
    ...mapActions('auth', ['forgotPassword']),
    async submit() {
      if (this.$refs.form.validate()) {
        await this.forgotPassword(this.email)
        this.done = true
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
</style>
