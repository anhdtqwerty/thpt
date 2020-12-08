<template>
  <v-row justify="center">
    <v-col cols="12">
      <v-card ref="form" flat>
        <v-card-text>
          <v-text-field
            ref="name"
            v-model="name"
            label="Nhân Viên"
            placeholder="Nhập tên Nhân Viên"
            required
          ></v-text-field>
          <v-text-field
            ref="name"
            v-model="code"
            label="Mã Nhân Viên"
            placeholder="Nhập mã Nhân Viên"
            required
          ></v-text-field>
          <v-text-field
            ref="phone"
            v-model="phone"
            label="Số điện thoại"
            placeholder="Nhập số điện thoại"
            required
          ></v-text-field>
          <v-text-field ref="email" v-model="email" label="Email" placeholder="Nhập email"></v-text-field>
          <v-text-field ref="address" v-model="address" label="Địa Chỉ" placeholder="Nhập địa chỉ"></v-text-field>
          <v-textarea ref="notes" v-model="notes" label="Ghi Chú" placeholder="Nhập ghi chú"></v-textarea>
        </v-card-text>
        <v-card-actions>
          <div class="flex-grow-1"></div>
          <v-btn depressed small right color="error" @click="cancel">Cancel</v-btn>
          <v-btn depressed small color="success" style="margin: 0 20px" @click="save">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {}
</script>

<style>
</style>
