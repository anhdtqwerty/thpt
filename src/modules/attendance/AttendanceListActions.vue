<template>
  <div class="d-flex">
    <v-menu offset-y>
      <template v-slot:activator="{ on, attrs }">
        <v-btn v-bind="attrs" v-on="on" icon>
          <v-icon color="primary">mdi-dots-vertical</v-icon>
        </v-btn>
      </template>
      <v-list>
        <v-list-item>
          <v-list-item-title>Sửa điểm danh</v-list-item-title>
        </v-list-item>
        <v-list-item>
          <v-list-item-title>Gửi tin nhắn</v-list-item-title>
        </v-list-item>
        <v-list-item>
          <v-list-item-title>Xem chi tiết</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </div>
</template>

<script>
export default {
  components: {},
  props: {
    item: Object,
  },
  data() {
    return {}
  },
  computed: {},
  methods: {},
}
</script>
