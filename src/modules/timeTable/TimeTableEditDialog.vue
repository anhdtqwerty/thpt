<template>
  <v-edit-dialog @save="save" @cancel="cancel" @open="open" @close="close">
    <div>
      <span v-if="subject" class="primary--text subtitle-1">
        {{ subject.title }}</span
      >
      <br />
      <span class="primary--text caption"> {{ teacher.name }}</span>
    </div>
    <template v-slot:input>
      <v-autocomplete
        :items="subjects"
        v-model="subject"
        label="Edit"
        single-line
      />
      <v-autocomplete
        :items="teachers"
        v-model="teacher"
        item-text="name"
        item-value="id"
        label="Edit"
        single-line
      />
    </template>
  </v-edit-dialog>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  data() {
    return {
      subject: {},
      teacher: {}
    }
  },
  props: {
    slots: Object,
    day: String
  },
  computed: {
    ...mapGetters('search', ['teachers', 'subjects'])
  },
  created() {
    this.searchTeachers()
    if (!this.slots || !this.slots[this.day]) {
      return
    }
    this.subject = this.slots[this.day].subject
    this.teacher = this.slots[this.day].teacher
  },
  methods: {
    ...mapActions('search', ['searchTeachers']),
    save() {
      this.snack = true
      this.snackColor = 'success'
      this.snackText = 'Data saved'
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
  }
}
</script>
