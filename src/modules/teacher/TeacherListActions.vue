<template>
  <div class="d-flex justify-end">
    <v-menu offset-y>
      <template v-slot:activator="{ on, attrs }">
        <v-btn v-bind="attrs" v-on="on" icon>
          <v-icon>mdi-dots-vertical</v-icon>
        </v-btn>
      </template>
      <v-list>
        <v-list-item>
          <v-list-item-title style="cursor: pointer" @click="editTeacherStatus = !editTeacherStatus"
            >Chuyển trạng thái</v-list-item-title
          >
        </v-list-item>
      </v-list>
    </v-menu>
    <TeacherStatusEditDialog :teacher="teacher" :state="editTeacherStatus" />
  </div>
</template>

<script>
import TeacherStatusEditDialog from '@/modules/teacher/TeacherStatusEditDialog'

export default {
  components: {
    TeacherStatusEditDialog
  },
  props: {
    teacher: Object
  },
  data() {
    return {
      editTeacherStatus: false
    }
  }
}
</script>
