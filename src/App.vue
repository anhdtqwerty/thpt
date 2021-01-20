<template>
  <router-view></router-view>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  components: {},
  computed: {
    ...mapGetters('auth', ['user', 'profile', 'isAuthenticated']),
    ...mapGetters('app', ['users', 'department', 'roles'])
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
</style>
