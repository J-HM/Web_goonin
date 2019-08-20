<template>
  <v-card elevation='3'>
    <v-card-text style='text-align:center'>{{ start_date_dispay + ' ~ ' + last_date_dispay }}</v-card-text>
  </v-card>
</template>

<script>
  export default {
    props: [ 'start_date', 'last_date' ],
    
    computed: {
      last_date_dispay () { 
        return this.last_date.format('YYYY년 M월 D일')
      },
      
      start_date_dispay () { 
        return this.start_date.format('YYYY년 M월 D일')
      }
    }
    
  };
</script>