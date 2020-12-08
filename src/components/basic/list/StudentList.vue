<template>
  <v-list>
    <v-list-item>
      <v-list-item-content>
        <v-text-field
          v-model="search"
          append-icon="search"
          label="Tìm kiếm nhanh"
          clearable
          dense
          outlineds
        />
      </v-list-item-content>
    </v-list-item>
    <student-list-item
      v-for="(item, index) in students"
      :student="item"
      :key="index"
      @change="$emit('selected', item)"
    ></student-list-item>
  </v-list>
</template>

<script>
import StudentListItem from '@/components/basic/list/StudentListItem'

export default {
  components: {
    StudentListItem
  },
  props: {
    students: Array
  },
  data () {
    return {
      search: ''
    }
  }
}
</script>

<style scoped>
</style>
