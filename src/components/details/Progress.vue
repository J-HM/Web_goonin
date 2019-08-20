<template>
  <v-card elevation='3'>
    <v-row align='center' justify='center'>
      
      <v-col class='text-center' cols=5 id='progress'>
        <v-tooltip top>
          <template v-slot:activator="{ on }">
            <v-progress-circular
              v-on="on"
              rotate="-90"
              :size="progress_size"
              :value="percent"
              width="15"
              color="#039BE5dF"
              ><span 
                class="font-weight-bold title" 
                :class="{'subtitle-1': $vuetify.breakpoint.xs}"
                >{{ percent.toFixed(2) + '%' }}</span>
              </v-progress-circular>
            </template>
          <span>{{ detail_percent }}</span>
        </v-tooltip>
      </v-col>

      <v-col class='text-center' cols=6>
          
          <div v-if='view_1'>
            <v-tooltip top>
              <template v-slot:activator="{ on }">
                <span v-on='on' class='title'>{{ cut_day }}</span>
              </template>
              <span>기존 전역일은 {{ tooltip[0] }}</span>
            </v-tooltip>
            <span> 일 단축되어</span> 
          </div>

          <div>
            <span class='body-1'>복무기간은 </span>
            <v-tooltip right>
              <template v-slot:activator="{ on }">
                <span v-on='on' class='title'>{{ past_day+future_day }}</span>
              </template>
              <span>{{ tooltip[1] }}</span>
            </v-tooltip>
          </div>

          <div v-if='view_2' class='mt-1'> 
            <v-tooltip left>
              <template v-slot:activator="{ on }">
                <span v-on='on' class='title'>{{ past_day }}</span>
              </template>
              <span>{{ tooltip[2] }}</span>
            </v-tooltip>
            <span class='body-1'> 일 생활했고</span> 
          </div>

          <div v-if='view_2'> 
            <span>남은 날은 </span>
            <v-tooltip bottom>
              <template v-slot:activator="{ on }">
                <span v-on='on' class='title'>{{ future_day }}</span>
              </template>
              <span>{{ tooltip[3] }}</span>
            </v-tooltip>
          </div>
          
        </v-col>

    </v-row>

  </v-card>
</template>

<script>
  import moment from 'moment';
  
  export default {
    props: [ 'start_date', 'last_date', 'cut_day' ],
    
    computed: {
      tooltip () {
        var first = moment(this.last_date).add(this.cut_day, 'days').format('YY년 M월 D일')
        var second = this.get_diff(this.last_date, this.start_date)
        var third = this.get_diff(this.current_date, this.start_date)
        var fourth = this.get_diff(this.last_date, this.current_date)
        return [first, second, third, fourth]
      },
      
      past_day () {
        return this.current_date.diff(this.start_date, 'day')
      },
      
      future_day () {
        return this.last_date.diff(this.current_date, 'day') + 1
      },
      
      percent () {
        var percent_t = (this.current_date - this.start_date) / (this.last_date - this.start_date);
        if (percent_t >= 1) { return 100 }
        else if (percent_t <= 0) { return 0 }
        else { return percent_t * 100 }
      }, 
      
      progress_size () {
        switch (this.$vuetify.breakpoint.name) {
          case 'xs': return 100;
          case 'sm': return 110;
          default: return 130;
        }
      },
      
      detail_percent () {
        var percent = this.percent;
        if (percent == 100) { return '수고하셨습니다.' }
        else if (percent == 0) { return '화이팅!' }
        else { return '.' + percent.toFixed(9).split('.')[1] }
      },
      
      view_1 () {
        if ( this.cut_day == 0 ) { return false }
        else { return true }
      },
      
      view_2 () {
        if ( this.start_date > this.current_date) { return false }
        else if ( this.current_date > this.last_date ) { return false }
        else { return true }
      },
    },
    
    data: () => ({
      current_date: moment()
    }),
    
    mounted() {
      setInterval(() => { this.current_date = moment() }, 1000)
    },
    
    methods: {
      get_diff: function (date1, date2) {
        var diffTime = moment(date1).diff(date2)
        var duration = moment.duration(diffTime)
        var year ='', month='', day='';
        if (duration.years() != 0) { year = duration.years() + '년 '}
        if (duration.months() != 0) { month = duration.months() + '월 '}
        if (duration.days() != 0) { day = duration.days() + '일 '}
        return year + month + day
      }
    } 
    
  };
</script>