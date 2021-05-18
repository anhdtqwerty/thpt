<template>
  <v-form>
    <v-row no-gutters>
      <v-col cols="12" md="8" v-if="!advanced">
        <v-row no-gutters>
          <v-col class="py-2 pr-4" cols="12" md="4">
            <v-text-field
              v-model="name"
              label="Tên giáo viên"
              return-object
              clearable
              flat
              outlined
              dense
              hide-details
              @keyup.enter="onFilterChanged"
            />
          </v-col>
          <v-col class="py-2 pr-4" cols="12" md="4">
            <v-select
              :items="types"
              item-text="title"
              item-value="value"
              v-model="type"
              label="Loại cán bộ"
              outlined
              dense
              clearable
              hide-details
            ></v-select>
          </v-col>
          <v-col class="py-2 pr-4" cols="12" md="4">
            <autocomplete-subject
              v-model="subject"
              clear-icon="mdi-close"
              label="Lĩnh vực"
              clearable
              outlined
              dense
              return-object
              hide-details
            />
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="12" md="8" v-else>
        <v-row no-gutters>
          <v-col cols="12" md="4" class="pt-md-2">
            <AutocompleteTeacher
              prepend-inner-icon="mdi-magnify"
              v-model="id"
              item-text="name"
              item-value="id"
              clear-icon="mdi-close"
              clearable
              label="Tìm kiếm giáo viên"
              outlined
              dense
              deletable-chips
              :hide-details="$vuetify.breakpoint.smAndDown"
              :class="{ 'mb-4': $vuetify.breakpoint.smAndDown }"
              @change="onFilterChanged"
            />
          </v-col>
        </v-row>
      </v-col>
      <v-col class="py-2 d-flex" cols="12" md="4">
        <v-btn v-if="!advanced" height="40" color="#0D47A1" @click="onFilterChanged" outlined>
          <v-icon left dark>mdi-filter-outline</v-icon>Lọc
        </v-btn>
        <v-spacer />
        <v-checkbox class="mt-n1 pt-3" v-model="advanced" label="Tìm kiếm nhanh"></v-checkbox>
      </v-col>
    </v-row>
  </v-form>
</template>

<script>
import AutocompleteTeacher from '@/components/basic/input/AutocompleteTeacher'
import AutocompleteSubject from '@/components/basic/input/AutocompleteSubject'

export default {
  components: {
    AutocompleteTeacher,
    AutocompleteSubject
  },
  data: () => ({
    query: '',
    dialog: false,
    name: '',
    subject: '',
    type: '',
    filterState: false,
    types: [
      { value: 'short-tern', title: 'Ngắn hạn' },
      { value: 'long-tern', title: 'Dài hạn' }
    ],
    advanced: false
  }),
  methods: {
    onFilterChanged() {
      this.$emit('onFilterChanged', {
        id: this.id,
        name_contains: this.name,
        subject: this.subject.id,
        type: this.type
      })
    },
    onFilterDialogChange(id) {
      this.$emit('onFilterChanged', id)
    }
  }
}
</script>
