<template>
  <v-edit-dialog @save="save" @cancel="cancel" @open="open" @close="close">
    <div style="display: block">
      <span v-if="data" class="primary--text subtitle-1">
        {{ data | getSubject }}</span
      >
      <br />
      <span v-if="data" class="primary--text caption">
        {{ data | getTeacher }}</span
      >
      <span v-if="!data" class="primary--text ">sửa</span>
    </div>
    <template v-slot:input>
      <v-autocomplete
        class="mt-4"
        :items="subjects"
        v-model="subject"
        item-text="title"
        item-value="id"
        label="Môn"
        outlined
        return-object
        dense
        single-line
      />
      <v-autocomplete
        :items="teachers"
        v-model="teacher"
        item-text="name"
        item-value="id"
        return-object
        label="Giáo viến"
        outlined
        dense
        single-line
      />
    </template>
  </v-edit-dialog>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import { get } from 'lodash'
export default {
  data() {
    return {
      subject: {},
      teacher: {},
      dialog: false
    }
  },
  props: {
    data: Object
  },
  computed: {
    ...mapGetters('search', ['teachers', 'subjects'])
  },
  created() {
    if (!this.data) return
    this.subject = this.data.subject
    this.teacher = this.data.teacher
  },
  methods: {
    save() {
      console.log(123)
      this.$emit('update:data', {
        subject: { title: this.subject.title, id: this.subject.id },
        teacher: { name: this.teacher.name, id: this.teacher.id }
      })
    },
    cancel() {
      this.snack = true
      this.snackColor = 'error'
      this.snackText = 'Canceled'
    },
    open() {
      this.snack = true
      this.snackColor = 'info'
      this.snackText = 'Dialog opened'
    },
    close() {}
  },
  filters: {
    getTeacher(data) {
      return get(data, 'teacher.name')
    },
    getSubject(data) {
      return get(data, 'subject.title')
    }
  }
}
</script>
