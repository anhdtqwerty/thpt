<template>
  <v-menu v-model="menu" open-on-hover offset-y>
    <template v-slot:activator="{ on }">
      <v-btn text v-on="on" small>
        <v-icon>mdi-chart-pie</v-icon>Tổng Quan
      </v-btn>
    </template>
    <v-card>
      <v-list>
        <v-list-item link to="/" v-if="policies['view-teacher-list']">
          <v-list-item-title>Tổng Quan</v-list-item-title>
          <v-list-item-icon>
            <v-icon>recent_actors</v-icon>
          </v-list-item-icon>
        </v-list-item>
        <v-list-item link to="/statistic/monthly" v-if="policies['view-staff-list']">
          <v-list-item-title>Vận Hành</v-list-item-title>
          <v-list-item-icon>
            <v-icon>people_alt</v-icon>
          </v-list-item-icon>
        </v-list-item>
        <v-list-item link to="/statistic/monthly" v-if="policies['view-staff-list']">
          <v-list-item-title>Bán Hàng</v-list-item-title>
          <v-list-item-icon>
            <v-icon>people_alt</v-icon>
          </v-list-item-icon>
        </v-list-item>
      </v-list>
    </v-card>
  </v-menu>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data () {
    return { menu: null }
  },
  computed: {
    ...mapGetters('app', ['department', 'policies']),
    ...mapGetters('auth', ['user', 'role'])
  }
}
</script>

<style scoped>
</style>
