<template>
  <div>
    <v-row class="d-none d-md-flex justify-space-around">
      <autocomplete-staff
        v-model="name"
        item-text=""
        item-value=""
        label="Họ tên"
        class="ma-2"
        filled
        clearable
        single-line
        dense
      ></autocomplete-staff>
      <v-autocomplete
        v-model="status"
        :items="statusList"
        chips
        small-chips
        clear-icon="mdi-close"
        clearable
        deletable-chips
        label="Trạng Thái"
        filled
        single-line
        dense
        multiple
        class="ma-2"
      ></v-autocomplete>

      <v-btn
        class="ma-2"
        dark
        height="41"
        color="amber dark-1"
        depressed
        @click="onFilterChanged"
      >
        <v-icon class="" left>filter_alt</v-icon>Lọc
      </v-btn>
    </v-row>
    
    <v-row class="d-flex flex-cloumn d-md-none justify-end">
      <v-btn icon @click="filterState=!filterState">
        <v-icon left>filter_alt</v-icon>
      </v-btn>

      <staff-filter-dialog @onFilterChanged="onFilterDialogChanged" :state="filterState" />
    </v-row>
    
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import AutocompleteStaff from '@/components/basic/input/AutocompleteStaff'
import StaffFilterDialog from '@/modules/staff/StaffFilterDialog'


export default {
  components: {
    AutocompleteStaff,
    StaffFilterDialog
  },
  data: () => ({
    name: '',
    query: '',
    statusList: ['active', 'block'],
    status: [],
    selectedRole: [],
    filterState: false
  }),
  computed: {
    ...mapGetters('app', ['users', 'roles']),
    roleList () {
      return this.roles.filter(role => {
        return role.type !== 'student' && role.type !== 'public'
      })
    }
  },
  methods: {
    ...mapActions('staff', ['updateStudent']),
    onFilterChanged () {
      this.query =
        this.name?('name_in='+this.name+'&'):''+
        this.status?(
          this.status.map(item => {
            return 'status_in=' + item
          })
          .join('&')):''
      this.$emit('onFilterChanged', this.query)
    },
    onFilterDialogChanged(data) {
      this.query =
        data.name?('name_in='+data.name+'&'):''+
        data.status?('status_in=' + data.status):''
      this.$emit('onFilterChanged', this.query)
    }
  }
}
</script>
