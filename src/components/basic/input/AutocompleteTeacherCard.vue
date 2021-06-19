<template>
  <v-autocomplete
    v-bind="this.$attrs"
    item-text="name"
    :items="teachers"
    return-object
    @change="onChange"
    v-on:input="$emit('input', $event)"
    clearable
    :loading="loading"
    v-model="teacher"
  >
    <template v-slot:item="data">
      <v-list-item-content>
        <CardTeacherInfo :displayGender="displayGender" :teacher="data.item" />
      </v-list-item-content>
    </template>
  </v-autocomplete>
</template>

<script>
import { Teacher } from '@/plugins/api'
import CardTeacherInfo from '@/components/basic/card/CardTeacherInfo.vue'
import { mapGetters } from 'vuex'

export default {
  components: {
    CardTeacherInfo
  },
  data: () => ({
    teachers: [],
    loading: false,
    teacher: ''
  }),
  props: {
    filter: Object,
    options: Object,
    defaultTeachers: Object,
    defaultTeacher: Object,
    displayGender: {
      default: false,
      type: Boolean
    }
  },
  watch: {
    filter(filter) {
      this.fetchTeachers(filter)
    },
    syncedValue(value) {
      this.teacher = value
    }
  },
  computed: {
    ...mapGetters('app', ['department', 'roles', 'roleIdByName'])
  },
  created() {
    if (this.defaultTeachers) {
      this.teachers = this.defaultTeachers
    }
    this.fetchAllTeachers()
  },
  methods: {
    async fetchAllTeachers() {
      this.teachers = await Teacher.fetch({
        ...this.filter,
        department: this.department.id,
        _limit: -1
      })
      if (this.defaultTeacher) {
        this.teachers = this.teachers.filter(item => item.id !== this.defaultTeacher.id)
      }
    },
    onChange(data) {
      this.$emit('change', data)
    }
  }
}
</script>
