<template>
  <v-menu open-on-hover bottom offset-y>
    <template v-slot:activator="{ on }">
      <v-btn text v-on="on" icon>
        <v-icon small>mdi-dots-horizontal</v-icon>
      </v-btn>
    </template>
    <v-list>
      <v-list-item @click="getXLSX()">
        <v-list-item-title>Xuất File</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>
<script>
import { mapActions, mapState } from 'vuex'
export default {
  props: {
    role: String
  },
  data () {
    return {
      studentTableOptions: {}
    }
  },
  async created () {},
  computed: {
    ...mapState('app', ['department']),
    ...mapState('students', ['totalItems', 'students'])
  },
  methods: {
    ...mapActions('students', ['requestPageSettings']),
    getXLSX () {}
  },
  watch: {}
}
</script>
