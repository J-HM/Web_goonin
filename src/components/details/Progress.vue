<template>
	<v-card elevation='3'>
		<v-row align='center' justify='space-around' class='px-4'>
			
			<div class='text-center py-3 pr-1'>
				<v-tooltip top>
					<template v-slot:activator="{ on }">
						<v-progress-circular 
							v-on="on" 
							rotate="-90" 
							:size="progress_size" 
							:value="current_percent" 
							width="15" 
							color="#42A5F5"
						><span 
							class="font-weight-bold title"
							:class="{'subtitle-1': $vuetify.breakpoint.xs}"
						>{{ current_percent.toFixed(2) + '%' }}</span>
						</v-progress-circular>
					</template>
					<span>{{ '.' + this.current_percent.toFixed(6).split('.')[1] }}</span>
				</v-tooltip>
			</div>
 
			<div class='text-center py-3'>
				<div v-if='view_1'>
					<v-tooltip top>
						<template v-slot:activator="{ on }">
							<span v-on='on' class='title'>{{ cut_day }}</span>
						</template>
						<span>기존 전역일 {{ tooltip[0] }}</span>
					</v-tooltip>
					<span> 일 단축되어</span>
				</div>
				<div>
					<span class='body-1'>복무기간은 </span>
					<v-tooltip right>
						<template v-slot:activator="{ on }">
							<span v-on='on' class='title'>{{ sum_days }}</span>
						</template>
						<span>{{ tooltip[1] }}</span>
					</v-tooltip>
				</div>
				<div v-if='view_2' class='mt-1'>
					<v-tooltip left>
						<template v-slot:activator="{ on }">
							<span v-on='on' class='title'>{{ past_days }}</span>
						</template>
						<span>{{ tooltip[2] }}</span>
					</v-tooltip>
					<span class='body-1'> 일 생활했고</span>
				</div>
				<div v-if='view_2'>
					<span>남은 날은 </span>
					<v-tooltip bottom>
						<template v-slot:activator="{ on }">
							<span v-on='on' class='title'>{{ future_days }}</span>
						</template>
						<span>{{ tooltip[3] }}</span>
					</v-tooltip>
				</div>
			</div>
		</v-row>
	</v-card>
</template>

<script>
	import moment from 'moment';
	
	export default {
		props: ['start_date', 'last_date', 'cut_day'],
		
		computed: {
			tooltip () {
				var first = moment(this.last_date).add(this.cut_day, 'days').format('YY년 M월 D일')
				var second = this.get_diff(this.last_date, this.start_date)
				var third = this.get_diff(this.current_date, this.start_date)
				var fourth = this.get_diff(this.last_date, this.current_date)
				return [first, second, third, fourth]
			}, // 툴팁
			
			past_days () {
				return this.current_date.diff(this.start_date, 'day')
			}, // 지난날 일수
			
			future_days () {
				return this.last_date.diff(this.current_date, 'day') + 1
			}, // 남은날 일수
			
			sum_days () {
				return this.last_date.diff(this.start_date, 'day')
			}, // 복무기간 일수
			
			current_percent () {
				var percent = this.past_days / this.sum_days
				if (percent >= 1) { return 100 } 
				else if (percent <= 0) { return 0 } 
				else { return percent * 100 }
			}, // 현재 진행 퍼센트
			
			progress_size () {
				switch (this.$vuetify.breakpoint.name) {
					case 'xs': return 110;
					case 'sm': return 113;
					case 'md': return 115;
					default: return 130;
				}
			},
			
			view_1 () {
				if (this.cut_day == 0) { return false }
				else { return true }
			},
			
			view_2 () {
				if (this.past_days < 0) { return false }
				else if (this.current_date > this.last_date) { return false } 
				else { return true }
			},
		},
		
		data: () => ({
			current_date: moment()
		}),
		
		methods: {
			get_diff: function(date1, date2) {
				var diffTime = moment(date1).diff(date2)
				var duration = moment.duration(diffTime)
				var year = '', month = '', day = '';
				if (duration.years() != 0) { year = duration.years() + '년 ' }
				if (duration.months() != 0) { month = duration.months() + '월 ' }
				if (duration.days() != 0) { day = duration.days() + '일 ' }
				return year + month + day
			}
		}
	};
</script>