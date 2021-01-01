<template>
  <v-form>
    <v-row :class="{ 'mt-7': $vuetify.breakpoint.smAndDown }" no-gutters>
      <v-col cols="12" md="10">
        <v-row>
          <v-col
            :class="{ 'py-0': $vuetify.breakpoint.mdAndUp }"
            cols="12"
            md="4"
          >
            <autocomplete-class
              item-text="name"
              item-value="id"
              clear-icon="mdi-close"
              clearable
              placeholder="Lớp"
              filled
              dense
              deletable-chips
              :hide-details="$vuetify.breakpoint.smAndDown"
              :class="{ 'mb-4': $vuetify.breakpoint.smAndDown }"
            />
          </v-col>
          <v-col
            :class="{ 'py-0': $vuetify.breakpoint.mdAndUp }"
            cols="12"
            md="4"
          >
            <DateRangeIOSPicker
              placeholder="Ngày"
              filled
              outline
            />
          </v-col>
          <v-col
            :class="{ 'py-0': $vuetify.breakpoint.mdAndUp }"
            cols="12"
            md="4"
          >
            <autocomplete-student
              v-model="student"
              item-text="name"
              clearable
              clear-icon="mdi-close"
              filled
              placeholder="Tên học sinh"
              item-value="id"
              dense
              deletable-chips
              :hide-details="$vuetify.breakpoint.smAndDown"
              :class="{ 'mb-4': $vuetify.breakpoint.smAndDown }"
            />
          </v-col>
        </v-row>
      </v-col>

      <v-col cols="12" md="2">
        <v-btn large dark @click="onFilterChanged" color="primary" outlined>
          <v-icon left dark>mdi-filter-outline</v-icon>Lọc
        </v-btn>
      </v-col>
    </v-row>
  </v-form>
</template>

<script>
import { mapState } from 'vuex'
import AutocompleteStudent from '@/components/basic/input/AutocompleteStudent.vue'
import AutocompleteClass from '@/components/basic/input/AutocompleteClass.vue'
import DateRangeIOSPicker from '@/components/basic/picker/DateRangeIOSPicker.vue'

export default {
  components: {
    AutocompleteClass,
    AutocompleteStudent,
    DateRangeIOSPicker,
  },
  data: () => ({
    student: {},
    class: '',
    tags: '',
    student:'',
  }),
  computed: {
    ...mapState('constant', ['classStatus']),
  },
  methods: {
    onFilterChanged() {
      this.$emit('onFilterChanged', {
        dialog: false,
        class: this.class,
        student: this.student,
        _sort: 'createdAt:desc',
      })
    },
    reset() {
      this.how = false
      this.query = ''
      this.class = ''
    },
  },
}
</script>

<style scoped></style>
