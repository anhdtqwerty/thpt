<template>
    <v-autocomplete
            v-model="selected"
            :items="search"
            chips
            item-text="name"
            item-value="id"
            return-object
            placeholder="Nhập để thêm học sinh"
            single-line
            clearable
            deletable-chips
            full-width
            hide-details
            append-icon="add"
            @change="onSelected"
            @focus="clear"
            @update:search-input="keywords"
    >
        <template v-slot:item="data">
            <template v-if="typeof data.item !== 'object'">
                <v-list-item-content v-text="data.item"></v-list-item-content>
            </template>
            <template v-else>
                <v-list-item-avatar>
                    <img :src="data.item.avatar">
                </v-list-item-avatar>
                <v-list-item-content>
                    <v-list-item-title v-html="data.item.name"></v-list-item-title>
                    <v-list-item-subtitle v-html="data.item.code"></v-list-item-subtitle>
                </v-list-item-content>
            </template>
        </template>
    </v-autocomplete>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  data () {
    return {
      selected: null
    }
  },
  computed: {
    ...mapState('student', ['search'])
  },
  methods: {
    ...mapActions('student', ['searchStudents', 'setStudents', 'setSearch']),
    async keywords (text) {
      if (text) {
        await this.searchStudents({ keywords: text, status: 'active' })
      } else {
        await this.searchStudents({ limit: 20, status: 'active' })
      }
    },
    onSelected () {
      if (this.selected) {
        this.$emit('change', this.selected)
      }
      this.clear()
    },
    clear () {
      this.selected = null
      this.setSearch([])
    }
  },
  watch: {
    search (search) {
    }
  }
}
</script>
