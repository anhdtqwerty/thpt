<template>
  <v-menu open-on-hover bottom offset-y>
    <template v-slot:activator="{ on }">
      <v-btn text v-on="on" icon>
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn>
    </template>
    <v-list>
      <v-list-item @click="getXLSX()">
        <v-list-item-title>Xuất File</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>
<script>
import { mapGetters } from 'vuex'
import { parse } from 'json2csv'
import { saveAs } from 'file-saver'
export default {
  props: {
    role: String
  },
  data () {
    return {
      studentTableOptions: {}
    }
  },
  async created () {},
  computed: {
    ...mapGetters('classDetail', ['students', 'classData'])
  },
  methods: {
    getXLSX () {
      try {
        const csv = parse(
          this.students.map(s => ({
            code: s.code,
            name: s.name,
            email: s.email,
            phone: s.phone,
            address: s.address,
            tags: s.tags
          })),
          Object.keys(this.students)
        )
        var csvFile = new Blob([csv], { type: 'text/csv' })
        // const file = new Blob(csv, 'hello world.csv', { type: 'text/csv;charset=utf-8' })
        saveAs(csvFile, `PARTNER.csv`)
        // saveAs(csv, 'hello world.csv')
      } catch (err) {
        console.error(err)
      }
    }
  },
  watch: {}
}
</script>
