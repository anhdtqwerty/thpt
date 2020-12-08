<template>
  <v-form>
    <v-row :class="{ 'mt-7': $vuetify.breakpoint.smAndDown }" no-gutters>
      <v-col cols="12" md="9">
        <v-row>
          <v-col
            :class="{ 'py-0': $vuetify.breakpoint.mdAndUp }"
            cols="12"
            md="4"
          >
            <v-autocomplete
              v-model="status"
              :items="classStatus"
              clear-icon="mdi-close"
              item-text="title"
              item-value="status"
              placeholder="Chọn trạng thái"
              background-color="#f5f5f5"
              flat
              filled
              dense
              clearable
              deletable-chips
              :hide-details="$vuetify.breakpoint.smAndDown"
              :class="{ 'mb-4': $vuetify.breakpoint.smAndDown }"
            ></v-autocomplete>
          </v-col>
          <v-col
            :class="{ 'py-0': $vuetify.breakpoint.mdAndUp }"
            cols="12"
            md="4"
          >
            <autocomplete-major
              v-model="major"
              item-text="title"
              item-value="id"
              placeholder="Chọn chuyên ngành"
              background-color="#f5f5f5"
              flat
              filled
              dense
              return-object
              required
              clearable
              :hide-details="$vuetify.breakpoint.smAndDown"
              :class="{ 'mb-4': $vuetify.breakpoint.smAndDown }"
            ></autocomplete-major>
          </v-col>
          <v-col
            :class="{ 'py-0': $vuetify.breakpoint.mdAndUp }"
            cols="12"
            md="4"
          >
            <v-autocomplete
              v-model="course"
              item-text="title"
              :items="getCourseItems"
              item-value="id"
              placeholder="Chọn Môn học"
              background-color="#f5f5f5"
              flat
              filled
              dense
              return-object
              required
              clearable
              :hide-details="$vuetify.breakpoint.smAndDown"
              :class="{ 'mb-4': $vuetify.breakpoint.smAndDown }"
            ></v-autocomplete>
          </v-col>
        </v-row>

        <v-row v-show="getShow">
          <v-col
            :class="{ 'py-0': $vuetify.breakpoint.mdAndUp }"
            cols="12"
            md="4"
          >
            <v-text-field
              v-model="tags"
              item-text="tags"
              item-value="id"
              clear-icon="mdi-close"
              placeholder="Nhập tên nhóm"
              background-color="#f5f5f5"
              deletable-chips
              clearable
              multiple
              flat
              filled
              dense
              return-object
              :hide-details="$vuetify.breakpoint.smAndDown"
              :class="{ 'mb-4': $vuetify.breakpoint.smAndDown }"
            />
          </v-col>
          <v-col
            :class="{ 'py-0': $vuetify.breakpoint.mdAndUp }"
            cols="12"
            md="4"
          >
            <autocomplete-generation
              v-model="generations"
              item-text="name"
              item-value="id"
              placeholder="Chọn khóa"
              background-color="#f5f5f5"
              return-object
              deletable-chips
              clearable
              multiple
              flat
              filled
              dense
              :hide-details="$vuetify.breakpoint.smAndDown"
            ></autocomplete-generation>
          </v-col>
          <v-col cols="12" md="4"></v-col>
        </v-row>
      </v-col>

      <v-col
        cols="12"
        class="d-flex justify-end"
        :class="{ 'mt-1': $vuetify.breakpoint.smAndDown }"
        md="3"
      >
        <v-btn
          depressed
          width="120px"
          height="38px"
          color="white"
          @click="show = !show"
          class="grey--text darken-1--text"
          v-show="$vuetify.breakpoint.mdAndUp"
        >
          <v-icon left dark>{{
            show ? 'mdi-chevron-up' : 'mdi-chevron-down'
          }}</v-icon
          >Nâng cao
        </v-btn>
        <v-btn
          depressed
          width="80px"
          height="38px"
          color="#0D47A1"
          @click="onFilterChanged"
          class="white--text ml-4"
        >
          <v-icon left dark>mdi-filter-outline</v-icon>Lọc
        </v-btn>
      </v-col>
    </v-row>
  </v-form>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
import AutocompleteMajor from '@/components/basic/input/AutocompleteMajor'
import AutocompleteGeneration from '@/components/basic/input/AutocompleteGeneration'

export default {
  components: {
    AutocompleteMajor,
    AutocompleteGeneration
  },
  data: () => ({
    show: false,
    query: '',
    major: {},
    course: '',
    status: 'running',
    generations: '',
    tags: ''
  }),
  computed: {
    ...mapGetters('course', ['courses']),
    ...mapState('constant', ['classStatus']),
    getCourseItems() {
      return this.major ? this.major.courses : []
    },
    getShow() {
      switch (this.$vuetify.breakpoint.name) {
        case 'xs':
        case 'sm':
          return true
        default:
          return this.show
      }
    }
  },
  methods: {
    onFilterChanged() {
      this.$emit('onFilterChanged', {
        dialog: false,
        status: this.status,
        course: this.getCourse(),
        major: this.getMajor(),
        generation: this.getGenerations(),
        tags: this.tags,
        _sort: 'createdAt:desc'
      })
    },
    reset() {
      this.how = false
      this.query = ''
      this.major = {}
      this.course = ''
      this.status = 'running'
      this.generations = ''
      this.tags = ''
    },
    getCourse() {
      return this.course ? this.course.id : ''
    },
    getMajor() {
      return this.major ? this.major.id : ''
    },
    getGenerations() {
      return this.generations
        ? this.generations.map(generation => generation.id)
        : ''
    }
  }
}
</script>

<style scoped></style>
