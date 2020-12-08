<template>
  <v-card>
    <v-tabs :right="$vuetify.breakpoint.mobile" color="#FF9800">
      <v-tab> Hiển Thị </v-tab>
      <v-tab> Thiết Lập Quyền </v-tab>
      <v-tab> Cài Đặt </v-tab>

      <v-tab-item>
        <infor-tabs-item
          :department="department"
          @save="save"
        ></infor-tabs-item>
      </v-tab-item>
      <v-tab-item>
        <policy-tabs-item
          :department="department"
          :roles="roles"
          @save="save"
        ></policy-tabs-item>
      </v-tab-item>
    </v-tabs>
  </v-card>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import InforTabsItem from '@/modules/department/InforTabsItem'
import PolicyTabsItem from '@/modules/department/PolicyTabsItem'

export default {
  components: {
    InforTabsItem,
    PolicyTabsItem,
  },
  data() {
    return {
      search: '',
      tab: null,
      headers: [
        {
          text: 'Title',
          align: 'left',
          sortable: false,
          value: 'title',
        },
        { text: 'description', value: 'description' },
        { text: 'price(vnd)', value: 'price' },
      ],
    }
  },
  computed: {
    ...mapGetters('department', ['departments', 'department']),
    ...mapGetters('app', ['roles']),
  },
  methods: {
    ...mapActions('department', ['fetchDepartment', 'updateDepartment']),
    save(department) {
      this.updateDepartment({ ...this.department, ...department })
    },
  },
  async created() {
    this.fetchDepartment(this.$route.params.id)
  },
}
</script>
<style lang='scss' scoped>
::v-deep {
  .v-tab--active {
    background-color: #ffecb3;
    color: #212121;
  }
}
</style>
