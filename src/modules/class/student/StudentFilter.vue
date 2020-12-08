<template>
  <v-list dense>
    <v-subheader>BỘ LỌC</v-subheader>
    <v-list-item>
      <v-text-field label="Nhóm" v-model="tags" dense outlined></v-text-field>
    </v-list-item>
    <v-divider></v-divider>
    <v-subheader>Tìm kiếm theo học sinh</v-subheader>
    <v-list-item>
      <v-text-field label="Mã học sinh" v-model="code" dense outlined></v-text-field>
    </v-list-item>
    <v-list-item>
      <v-text-field label="Email" v-model="email" dense outlined></v-text-field>
    </v-list-item>
    <v-list-item>
      <v-text-field label="Số điện thoại" v-model="phone" dense outlined></v-text-field>
    </v-list-item>
    <v-card-actions>
      <div class="flex-grow-1"></div>
      <v-btn depressed small @click="onFilterChanged()">
        <v-icon left dark>mdi-magnify</v-icon>Tìm Kiếm
      </v-btn>
    </v-card-actions>
  </v-list>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  data: () => ({
    tags: '',
    code: '',
    email: '',
    phone: ''
  }),
  methods: {
    ...mapActions('staff', ['updateStudent']),
    onFilterChanged () {
      this.$emit('onFilterChanged', {
        tags_contains: this.tags,
        code: this.code,
        phone: this.phone,
        email: this.email
      })
    }
  }
}
</script>
