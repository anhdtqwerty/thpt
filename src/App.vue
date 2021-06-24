<template>
  <router-view></router-view>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  components: {},
  computed: {
    ...mapGetters('auth', ['user', 'profile', 'isAuthenticated']),
    ...mapGetters('app', ['department', 'roles'])
  }
}
</script>
<style>
input {
  margin: 0px 0px !important;
}

.left-amber-border {
  border-left: 4px solid #0d47a1;
}
.required label::after {
  content: ' *';
  color: red;
}
.v-data-table-header {
  background-color: #f5f5f5;
  border-bottom: none;
}
.content-text {
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 24px;
  text-align: center;
  color: #757575;
}
</style>
