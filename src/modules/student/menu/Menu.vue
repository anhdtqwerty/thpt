<template>
  <div>
    <v-menu open-on-hover bottom offset-y>
      <template v-slot:activator="{ on }">
        <v-btn text v-on="on" icon>
          <v-icon medium>mdi-dots-horizontal</v-icon>
        </v-btn>
      </template>
      <v-list>
        <v-list-item @click="getXLSX()">
          <v-list-item-title>Xuất File</v-list-item-title>
        </v-list-item>
        <v-list-item @click="settingState = !settingState">
          <v-list-item-title>Cài đặt</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
    <setting-headers @change="change" :default-headers="defaultHeaders" :state="settingState" />
  </div>
</template>
<script>
import { mapActions, mapState } from 'vuex'
import SettingHeaders from '@/components/basic/table/SettingHeaders'

export default {
  components: { SettingHeaders },
  props: {
    defaultHeaders: {
      type: Array,
      default() {
        return []
      },
    },
    role: String,
  },
  data() {
    return {
      studentTableOptions: {},
      settingState: false,
    }
  },
  async created() {},
  computed: {
    ...mapState('app', ['department']),
    ...mapState('students', ['totalItems', 'students']),
  },
  methods: {
    ...mapActions('students', ['requestPageSettings']),
    getXLSX() {},
    change(val) {
      this.$emit('change', val)
      this.dialog = false
    },
  },
}
</script>
