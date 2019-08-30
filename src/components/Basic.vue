<template>
    <v-row justify='center'>
      <v-col cols=5>
        <v-menu
          max-width=250
          ref="menu"
          v-model="menu"
          :close-on-content-click="false"
          transition="scale-transition"
          offset-y
          full-width
        >
          <template v-slot:activator="{ on }">
            <v-text-field
              v-model="date"
              label="입영일"
              prepend-inner-icon="mdi-calendar"
              readonly
              color="secondary"
              v-on="on"
            />
          </template>
          <v-date-picker
            width=250
            no-title
            ref="picker"
            v-model="date"
            max="2020-6-31"
            color="secondary"
            min="2011-04-12"
            @change="save_date"
            locale="ko-KR"
            :day-format="date => date.split('-')[2]"
          ></v-date-picker>
        </v-menu>
      </v-col>

      <v-col cols=5>
        <v-select
          color='secondary'
          v-model="sort"
          :items="sorts"
          label="군종류"
          prepend-inner-icon="mdi-sort"
          append-icon
        ></v-select>
      </v-col>
    </v-row>
</template>

<script>
  export default {
    data: () => ({
      menu: false,
      date: null,
      sort: null,
      sorts: ['육군', '의경', '해군', '공군', '해병', '의무해경', '의무소방', '사회복무요원'],          
    }),
    
    watch: {
      menu (val) {
        val && setTimeout(() => (this.$refs.picker.activePicker = 'YEAR'))
      },
      
      sort: function () {
        if (this.date !== null) {
          this.$emit('finish', this.date, this.sort)
        }
      },
      
      date: function () {
        if (this.sort !== null) {
          this.$emit('finish', this.date, this.sort)
        }
      }
    },
    
    methods: {
      save_date: function (date) {
        this.$refs.menu.save(date)
      },
    },
  }
</script>