<template>
  <v-autocomplete
    v-bind="this.$attrs"
    item-text="name"
    :items="teachers"
    item-value="id"
    @change="onChange"
    v-on:input="$emit('input', $event)"
    @update:search-input="update"
    clearable
  >
    <template v-slot:item="data">
      <v-list-item-content>
        <CardTeacherInfo
          :displayGender="displayGender"
          :teacher="data.item"
          :displaySubjectGroup="displaySubjectGroup"
        />
      </v-list-item-content>
    </template>
  </v-autocomplete>
</template>
<script>
import { mapGetters } from 'vuex'
import { Teachings } from '@/plugins/api'
import { map } from 'lodash'
import CardTeacherInfo from '@/components/basic/card/CardTeacherInfo.vue'

export default {
  components: {
    CardTeacherInfo
  },
  data: () => ({
    teachers: []
  }),
  props: {
    filter: Object,
    defaultTeachers: Array,
    displayGender: {
      default: false,
      type: Boolean
    },
    displaySubjectGroup: {
      default: false,
      type: Boolean
    }
  },
  computed: {
    ...mapGetters('app', ['commonQuery'])
  },
  created() {
    this.teachers = this.defaultTeachers
    this.fetchAllTeachers()
  },
  methods: {
    async fetchAllTeachers() {
      const teachings = await Teachings.fetch({
        ...this.filter,
        _limit: 9999,
        ...this.commonQuery
      })
      this.teachers = map(teachings, 'teacher')
    },
    async update(data) {},
    onChange(data) {
      this.$emit('change', data)
    }
  },
  watch: {
    filter: 'fetchAllTeachers'
  }
}
</script>
