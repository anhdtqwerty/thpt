<template>
  <v-dialog
    v-model="dialog"
    :fullscreen="$vuetify.breakpoint.smAndDown"
    :overlay="false"
    transition="dialog-transition"
  >
    <v-card>
      <v-card-title class="white--text font-weight-regular"
        >CÀI ĐẶT CỘT HIỂN THỊ</v-card-title
      >
      <v-row no-gutters>
        <v-col cols="6" class="py-0" v-for="i in colNumber" :key="i">
          <v-checkbox
            class="nowrap py-2"
            color="amber dark-1"
            hide-details
            v-for="header in originHeaders.slice(
              (i - 1) * itemPerCol,
              (i - 1) * itemPerCol + itemPerCol
            )"
            :key="header.text"
            v-model="header.show"
            :label="header.text"
          >
          </v-checkbox>
        </v-col>
      </v-row>
      <div class="d-flex justify-end">
        <v-card-actions>
          <v-btn class="my-16" large dark color="amber dark-1" @click="change">
            OK
          </v-btn>
        </v-card-actions>
      </div>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    defaultHeaders: {
      type: Array,
      default() {
        return []
      },
    },
    value: {
      type: Array,
      default() {
        return []
      },
    },
    state: Boolean,
  },
  data() {
    return {
      itemPerCol: 4,
      originHeaders: [],
      dialog: false,
    }
  },
  created() {
    this.originHeaders = JSON.parse(JSON.stringify(this.defaultHeaders))
  },
  computed: {
    colNumber() {
      return Math.ceil(this.originHeaders.length / this.itemPerCol)
    },
  },
  methods: {
    change() {
      console.log(this.originHeaders)
      this.$emit(
        'change',
        this.originHeaders.filter((item) => item.show)
      )
      this.dialog = false
    },
  },
  watch: {
    state(state) {
      this.dialog = true
    },
  },
}
</script>

<style scoped>
.setting__board {
  display: flex;
  background: #ffffff;
}
.setting__cols {
  margin-right: 24px;
  min-width: 200px;
}
.setting-table-header-wrapper {
  position: relative;
  display: inline-block;
  text-align: right;
}
</style>
