<template>
  <v-form>
    <v-row class="py-3">
      <v-col cols="10">
        <v-row>
          <v-col cols="4" class="pb-0">
            <v-text-field
              v-model="name"
              label="Họ tên giáo viên"
              return-object
              clearable
              flat
              outlined
              dense
              hide-details
              @keyup.enter="onFilterChanged"
            />
          </v-col>
          <v-col cols="4" class="pb-0">
            <v-text-field
              v-model="code"
              clear-icon="mdi-close"
              label="Mã số"
              default=""
              flat
              outlined
              dense
              clearable
              hide-details
              @keyup.enter="onFilterChanged"
            />
          </v-col>
          <v-col cols="4" class="pb-0"
            ><AutocompleteSubjectGroup
              v-model="subjectGroup"
              clear-icon="mdi-close"
              label="Lĩnh vực"
              item-text="title"
              outlined
              dense
              return-object
              hide-details
            />
          </v-col>
        </v-row>
      </v-col>
      <v-col class="d-flex justify-end align-center" cols="2">
        <v-btn height="40" color="#0D47A1" @click="onFilterChanged" outlined>
          Tìm kiếm
        </v-btn>
      </v-col>
    </v-row>
  </v-form>
</template>

<script>
import AutocompleteSubjectGroup from '@/components/basic/input/AutocompleteSubjectGroup'
import { textHelpers } from '@/helpers/TextHelper'
import { get } from 'lodash'

export default {
  components: {
    AutocompleteSubjectGroup
  },
  data: () => ({
    dialog: false,
    name: '',
    code: '',
    subjectGroup: null
  }),
  methods: {
    onFilterChanged() {
      this.$emit('onFilterChanged', {
        name_contains: this.name && textHelpers.removeSpaces(this.name),
        code_contains: this.code && textHelpers.removeSpaces(this.code),
        subjectGroup: get(this.subjectGroup, 'id')
      })
    }
  }
}
</script>
