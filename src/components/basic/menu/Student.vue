<template>
  <v-menu v-model="menu" open-on-hover offset-y>
    <template v-slot:activator="{ on }">
      <v-btn text v-on="on">
        <v-avatar :class="{ 'mr-4': !isXsScreen, 'mr-n6': isXsScreen }" size="32">
          <v-img :src="avatar" />
        </v-avatar>
        <div class="d-none d-sm-flex">{{ profile.name || 'Default Name' }}</div>
      </v-btn>
    </template>
    <v-card v-if="profile">
      <v-list>
        <v-list-item :to="'/student/' + profile.id">
          <v-avatar style="margin: 10px">
            <v-img :src="avatar" />
          </v-avatar>
          <v-list-item-content>
            <v-list-item-title>{{ profile.name || 'Default Name' }}</v-list-item-title>
            <v-list-item-subtitle>{{ profile.code || 'Default code' }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-list-item :to="'/student/' + profile.id">
          <v-list-item-content>
            <v-list-item-title>Học Phí</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <v-divider></v-divider>
      <v-list>
        <v-list-item>
          <v-btn text @click="changePassword()">Thay đổi mật khẩu</v-btn>
        </v-list-item>
        <v-list-item>
          <v-btn text @click="signOut()">Đăng xuất</v-btn>
        </v-list-item>
      </v-list>
    </v-card>
  </v-menu>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { get } from 'lodash'
export default {
  data() {
    return { menu: null }
  },
  computed: {
    ...mapGetters('app', ['department', 'roles']),
    ...mapGetters('auth', ['user', 'profile']),
    avatar() {
      return get(this.user, 'student.avatar.url', '/default-avatar.png')
    },
    isXsScreen() {
      return this.$vuetify.breakpoint.xs
    }
  },
  methods: {
    ...mapActions('auth', ['forgotPassword']),
    signOut() {
      if (this.$snapshot.validate()) {
        this.$store.dispatch('auth/signOut')
      }
    },
    async changePassword() {
      const email = this.user.email
      if (
        email &&
        (await this.$root.$confirm.show(
          'Xác nhận đổi mật khẩu',
          `Nếu đồng ý, mail chứa liên kết đổi mật khẩu sẽ được gửi tới:\r\n- ${email}`
        ))
      ) {
        this.forgotPassword(email)
      }
    }
  }
}
</script>

<style scoped></style>
