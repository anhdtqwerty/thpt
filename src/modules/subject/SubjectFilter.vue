<template>
  <v-form ref="form">
    <v-row>
      <v-col cols="12" md="10">
        <v-row>
          <v-col cols="12" md="4">
            <autocomplete-grade
              v-model="grade"
              item-text="title"
              clearable
              clear-icon="mdi-close"
              outlined
              placeholder="Khối"
              item-value="id"
              dense
              deletable-chips
              hide-details
            />
          </v-col>
          <v-col cols="12" md="4">
            <autocomplete-division
              v-model="divisions"
              item-text="name"
              item-value="title"
              clear-icon="mdi-close"
              clearable
              placeholder="Phân ban"
              outlined
              dense
              deletable-chips
              hide-details
            />
          </v-col>
          <v-col cols="12" md="4">
            <autocomplete-subject
              v-model="subject"
              item-text="title"
              clearable
              clear-icon="mdi-close"
              outlined
              placeholder="Môn học"
              item-value="id"
              dense
              deletable-chips
              hide-details
            />
          </v-col>
        </v-row>
      </v-col>

      <v-col cols="12" md="2">
        <v-btn
          height="40"
          dark
          @click="onFilterChanged()"
          color="primary"
          outlined
        >
          <v-icon left dark>mdi-filter-outline</v-icon>Lọc
        </v-btn>
      </v-col>
    </v-row>
  </v-form>
</template>

<script>
import { mapState } from 'vuex'
import moment from 'moment'
import AutocompleteSubject from '@/components/basic/input/AutocompleteSubject.vue'
import AutocompleteDivision from '@/components/basic/input/AutocompleteDivision.vue'
import AutocompleteGrade from '@/components/basic/input/AutocompleteGrade.vue'

export default {
  components: {
    AutocompleteSubject,
    AutocompleteDivision,
    AutocompleteGrade,
  },
  data: () => ({
    subject: '',
    query: '',
    divisions: '',
    grade: '',
    dialog: true,
  }),
  computed: {
    ...mapState('constant', ['subjectsStatus']),
  },
  methods: {
    onFilterChanged() {
      this.$emit('onFilterChanged', {
        grade: this.grade,
        divisions: this.divisions,
        id: this.subject,
      }),
      this.reset()
    },
    reset() {
      this.query = ''
      this.grade = ''
      this.divisions = ''
      this.subject = ''
    }
  },
}
</script>

<style scoped></style>
