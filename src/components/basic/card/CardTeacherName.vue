<template>
  <div v-if="teacher" class="d-flex flex-row align-center" :key="teacher.id" @click="$emit('change', teacher)"> 
    <v-avatar class="my-2 mr-2" size="34">
      <v-img :src="avatar" />
    </v-avatar>  
    <router-link class="teacher-link" :to="'/teacher/' + teacher.id">
      <div class="teacher-name">{{teacher.name}}</div>
    </router-link>  
  </div>
  <div v-else> Không có thông tin</div>
</template>
<script>
import _ from 'lodash'

export default {
  props: {
    teacher: Object,
    prepend: Object,
    append: Object,
    attendance: Object,
    link: Boolean
  },
  computed: {
    avatar () {
      return _.get(this.data, 'avatar.url', '/default-avatar.png')
    }
  }
}
</script>

<style scoped>
.teacher-link {
  text-decoration: none;
}

.teacher-name {
  white-space: nowrap;
}

</style>
