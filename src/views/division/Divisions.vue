<template>
  <div :class="{ 'px-3': $vuetify.breakpoint.mdAndUp }">
    <new-division-dialog :state="createDivision" />
    <v-row
      :class="{
        'px-2 mt-2': $vuetify.breakpoint.smAndDown,
        'mx-n2': $vuetify.breakpoint.mdAndUp,
      }"
      no-gutters
    >
      <v-col>
        <Breadcrumbs
          headline="Quản lý phân ban"
          :link="[{ text: 'Quản lý phân ban', href: '../divisions' }]"
        />
      </v-col>
      <v-col class="d-flex justify-end pt-4">
        <v-btn color="primary" @click="createDivision = !createDivision">
          <v-icon left>add</v-icon>{{ addButtonText }}
        </v-btn>
      </v-col>
    </v-row>
    <v-card class="pa-6">
      <p class="text-uppercase text-h6" style="color: #0d47a1">
        Danh sách các ban chuyên
      </p>
      <v-data-table :headers="headers" :items="divisions">
        <template v-slot:item.subjects="{ item }">
            <p>{{ item | getSubject }}</p>
        </template>
        <template v-slot:item.actions="{ item }">
            <division-actions
            :selected="item">
            </division-actions>
        </template>
      </v-data-table>
    </v-card>
  </div>
</template>


<script>
import { mapActions, mapState, mapGetters } from 'vuex'
import Breadcrumbs from '@/components/layout/Breadcrumbs'
import NewDivisionDialog from '@/modules/division/NewDivisionDialog.vue'
import DivisionActions from '@/modules/division/DivisionListActions.vue'

export default {
  components: {
    NewDivisionDialog,
    Breadcrumbs,
    DivisionActions,
  },
  props: {
    role: String,
  },
  data() {
    return {
      headers: [
        { text: 'Phân ban', value: 'title', align: 'left', sortable: false },
        { text: 'Khối', value: 'grade.title', align: 'left', sortable: false },
        {
          text: 'Các môn học',
          value: 'subjects',
          align: 'left',
          sortable: false,
        },
        { text: 'Hành động', value: 'actions', align: 'left', sortable: false },
      ],
      createDivision: false,
      selected: {},
    }
  },
  
  computed: {
    ...mapState('app', ['department']),
    ...mapState('division', ['divisions']),
    addButtonText() {
      switch (this.$vuetify.breakpoint.name) {
        case 'xs':
        case 'sm':
          return 'Thêm'
        default:
          return 'Thêm ban'
      }
    },
  },
  async created() {
    await this.refresh({}) 
  },
  methods: {
    ...mapActions('division', ['fetchDivision']),
    updateDraw(draw) {
      this.draw = draw
    },
    refresh() {
      this.fetchDivision()
    },
    onDivisionSelected(division) {
      this.setDivision(division)
    },    
  },
  filters:{
    getSubject(division) {
      return division.subjects.map((value) =>{return value.title}).join(' - ')
    }
  }
}
</script>