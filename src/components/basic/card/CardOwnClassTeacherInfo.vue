<template>
  <v-row>
    <v-col cols="3">
      <h2 class="primary--text">{{ ownClassTeacher.name }}</h2>
      <p class="grey--text">{{ ownClassTeacher.code }}</p>
    </v-col>
    <v-col cols="2">
      <span class="grey--text">Lĩnh vực</span>
      <p>{{ ownClassTeacher.subjectGroup | getSubjectGroupName(subjectGroups) }}</p>
    </v-col>
    <v-col cols="2">
      <span class="grey--text">Loại cán bộ</span>
      <p>{{ ownClassTeacher.type | teacherType }}</p>
    </v-col>
    <v-col cols="2">
      <span class="grey--text">Số điện thoại</span>
      <p>{{ ownClassTeacher.phone }}</p>
    </v-col>
    <v-col cols="3">
      <span class="grey--text">Email</span>
      <p>{{ ownClassTeacher.email }}</p>
    </v-col>
  </v-row>
</template>
<script>
import { mapState } from 'vuex'
import { get } from 'lodash'
export default {
  data() {
    return {}
  },
  props: {
    ownClassTeacher: Object
  },
  computed: {
    ...mapState('classDetail', ['subjectGroups'])
  },
  filters: {
    getSubjectGroupName(id, subjectGroups) {
      const subjectGroup = subjectGroups.find(item => item.id === id)
      return get(subjectGroup, 'title ', 'Không có')
    }
  }
}
</script>
