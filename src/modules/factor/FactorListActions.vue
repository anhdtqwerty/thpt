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
          <v-list-item-title style="cursor: pointer" @click="editFactor = !editFactor"> Sửa đầu điểm</v-list-item-title>
        </v-list-item>
        <v-list-item>
          <v-list-item-title style="cursor: pointer" @click="deleteFactor = !deleteFactor"
            >Xoá đầu điểm</v-list-item-title
          >
        </v-list-item>
      </v-list>
    </v-menu>

    <FactorDeleteDialog :item="factor" :state="deleteFactor" />
    <FactorEditDialog :factor="factor" :state="editFactor" />
  </div>
</template>

<script>
import FactorDeleteDialog from '@/modules/factor/FactorDeleteDialog'
import FactorEditDialog from '@/modules/factor/FactorEditDialog'

export default {
  components: { FactorDeleteDialog, FactorEditDialog },
  props: {
    disabled: Boolean,
    filter: Boolean,
    factor: Object
  },
  data() {
    return {
      deleteFactor: false,
      editFactor: false
    }
  },
  computed: {},
  methods: {},
  created() {}
}
</script>
