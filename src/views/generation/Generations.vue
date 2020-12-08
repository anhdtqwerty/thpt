<template>
  <div :class="{ 'px-3': $vuetify.breakpoint.mdAndUp }">
    <new-generation-dialog :state="createGeneration" />
    <generation-update-dialog
      :state="editGeneration"
      :generation="selected"
    />
    <v-row
      :class="{
        'px-2 mt-2': $vuetify.breakpoint.smAndDown,
        'mx-n2': $vuetify.breakpoint.mdAndUp
      }"
      no-gutters
    >
      <v-col>
        <Breadcrumbs
          headline="Danh sách niên khóa"
          :link="[{ text: 'Danh sách niên khóa', href: '../Generations' }]"
        />
      </v-col>
      <v-col class="d-flex justify-end pt-4">
        <v-btn color="success" @click="createGeneration = !createGeneration"
          ><v-icon left>add</v-icon>{{ addButtonText }}</v-btn
        >
      </v-col>
    </v-row>
    <v-card>
      <v-data-table
        item-key="id"
        :headers="headers"
        :items="generations"
        sort-by="createdAt"
        :sort-desc="true"
      >
        <template v-slot:item.actions="{ item }">
          <generation-list-actions
            :selected="item"
            @onEdit="onEditGeneration"
          />
        </template>
      </v-data-table>
    </v-card>
  </div>
</template>
<script>
import { mapActions, mapState, mapGetters } from 'vuex'
import Breadcrumbs from '@/components/layout/Breadcrumbs'
import GenerationListActions from '@/modules/generation/GenerationListActions'
import NewGenerationDialog from '@/modules/generation/NewGenerationDialog'
import GenerationUpdateDialog from '@/modules/generation/GenerationUpdateDialog'
export default {
  components: {
    GenerationListActions,
    NewGenerationDialog,
    GenerationUpdateDialog,
    Breadcrumbs
  },
  props: {
    role: String
  },
  data() {
    return {
      headers: [
        { text: 'Tên', value: 'name', align: 'left', sortable: false },
        { text: 'Mã Khóa', value: 'code', align: 'left', sortable: false },
        { text: 'Mô Tả', value: 'description', align: 'left', sortable: false },
        { text: 'Hành động', value: 'actions', align: 'left', sortable: false }
      ],
      selected: {},
      draw: false,
      search: '',
      status: null,
      statuses: [
        { text: 'Active', value: 'false' },
        { text: 'Blocked', value: 'true' }
      ],
      range: { from: null, to: null },
      previewUserId: null,
      ready: false,
      generationTableOptions: {},
      editGeneration: false,
      createGeneration: false
    }
  },
  async created() {
    this.fetchGenerations({ department: this.department.id })
  },
  computed: {
    ...mapState('app', ['department']),
    ...mapGetters('generation', ['generations']),
    addButtonText() {
      switch (this.$vuetify.breakpoint.name) {
        case 'xs':
        case 'sm':
          return 'Thêm'
        default:
          return 'Thêm niên khóa'
      }
    }
  },
  methods: {
    ...mapActions('generation', ['fetchGenerations']),
    updateDraw(draw) {
      this.draw = draw
    },
    onGenerationSelected(generation) {
      this.setGeneration(generation)
      this.draw = true
    },
    onEditGeneration(selected) {
      this.selected = selected
      this.editGeneration = !this.editGeneration
    }
  }
}
</script>
