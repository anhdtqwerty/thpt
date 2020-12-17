<template>
  <div class="d-flex">
    <v-menu offset-y>
      <template v-slot:activator="{ on, attrs }">
        <v-btn v-bind="attrs" v-on="on" icon>
          <v-icon>mdi-dots-vertical</v-icon>
        </v-btn>
      </template>
      <v-list>
        <v-list-item @click="remove">
          <v-icon left>mdi-delete</v-icon>
          <v-list-item-title>Xóa</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </div>
</template>

<script>
export default {
  components: {},
  props: {
    disabled: Boolean,
    teacher: Object,
    item: Object,
  },
  data() {
    return {}
  },
  computed: {},
  methods: {},
}
</script>
