<template>
  <v-radio-group @change="onChange" v-model="level" hide-details row class="shrink mt-0">
    <v-radio label="Cấp 1" hide-details value="primary"></v-radio>
    <v-radio label="Cấp 2" hide-details value="secondary"></v-radio>
    <v-radio label="Cấp 3" hide-details value="high"></v-radio>
  </v-radio-group>
</template>

<script>
import { AcademicLevel } from '@/plugins/api'
import { mapGetters } from 'vuex'

export default {
  data: () => ({
    level: '',
    listAcademic: [],
    academicFilter: ''
  }),
  computed: {
    ...mapGetters('app', ['department'])
  },
  props: {
    defaultLevel: {
      type: Object,
      default: () => {}
    }
  },
  async created() {
    await this.loadData()
  },
  methods: {
    async loadData() {
      this.listAcademic = await AcademicLevel.fetch({ department: this.department.id })
      if (this.defaultLevel) {
        this.academicFilter = this.listAcademic.find(a => a.id === this.defaultLevel.id)
        this.level = this.defaultLevel.type
      } else {
        this.academicFilter = this.listAcademic[1]
        this.level = 'secondary'
      }

      this.$emit('change', this.academicFilter)
    },
    onChange(data) {
      this.academicFilter = this.listAcademic.find(a => a.type === data)
      this.$emit('change', this.academicFilter)
    }
  }
}
</script>
