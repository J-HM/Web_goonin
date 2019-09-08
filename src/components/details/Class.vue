<template>
	<v-card elevation='3'>
		<v-row>
			<v-col cols=12>
				<Class_chart 
					style='height: 110px' 
					class='mb-n6 mt-1 pa-1' 
					:chart-data='datacollection'
				></Class_chart>
				<div class='title mb-n6 text-center'>{{ which_class(0) + ' ' + which_grade(0) }}</div>
			</v-col>
			<v-col cols=12>
				<v-row justify='center' v-show='view' class='mb-3'>
					<v-col cols=5>
						<v-tooltip bottom>
							<template v-slot:activator="{ on }">
								<div v-on="on" style='text-align: center'> {{ which_grade(0) + '호봉' }}
									<v-progress-linear 
										color="#64B5F6" 
										height="15" 
										rounded 
										:value="next_grade.percent" 
										class='caption'
									>{{ next_grade.percent + '%' }}</v-progress-linear>
								</div>
							</template>
							<span>{{ which_grade(1) + '호봉까지 ' + next_grade.days + '일' }}</span>
						</v-tooltip>
					</v-col>
					<v-col cols=5>
						<v-tooltip bottom>
							<template v-slot:activator="{ on }">
								<div v-on="on" style='text-align: center'> {{ which_class(0) }}
									<v-progress-linear 
										color="#7986CB" 
										height="15" 
										rounded 
										:value="next_class.percent"
										class='caption' 
										v-on="on"
										>{{ next_class.percent + '%' }}</v-progress-linear>
								</div>
							</template>
							<span>{{ which_class(1) + '까지 ' + next_class.days + '일' }}</span>
						</v-tooltip>
					</v-col>
				</v-row>
			</v-col>
		</v-row>
	</v-card>
</template>

<script>
	import Class_chart from './Class_chart'
	import moment from 'moment';
	
	export default {
		props: ['start_date', 'last_date'],
		
		components: {
			Class_chart
		},
		
		computed: {
			current_class() {
				if      (this.class_arr[0] > this.current_date) { return 0 } 
				else if (this.class_arr[1] > this.current_date) { return 1 } 
				else if (this.class_arr[2] > this.current_date) { return 2 } 
				else if (this.class_arr[3] > this.current_date) { return 3 } 
				else if (this.class_arr[4] > this.current_date) { return 4 } 
				else { return 5 }
			},
			
			which_class() {
				return (val) => {
					switch (this.current_class + val) {
						case  0: return '미필'
						case  1: return '이병'
						case  2: return '일병'
						case  3: return '상병'
						case  4: return '병장'
						default: return '전역'
					}
				}
			},
			
			which_grade() {
				return (val) => {
					if (this.current_class == 5 || this.current_class == 0) { return '' } 
					else {
						var grade = this.current_date.diff(this.class_arr[this.current_class - 1], 'months') + 1 + val;
						if (grade == 8) {
							if (this.current_class == 2) { return '상병1' } 
							else { return '병장1' }
						} else { return grade }
					}
				}
			},
			
			current_percent () {
				var percent = (this.current_date - this.start_date) / (this.last_date - this.start_date)
				if (percent >= 1) { return 100 } 
				else if (percent <= 0) { return 0 } 
				else { return percent * 100 }
			},
			
			view () {
				if (this.current_percent == 100) { return false } 
				else if (this.current_percent == 0) { return false } 
				else { return true }
			},
			
			next_class () {
				var past = this.current_date.diff(this.class_arr[this.current_class - 1], 'days')
				var sum = this.class_diff[this.current_class - 1]
				return {
					percent: (past / sum * 100).toFixed(2),
					days: sum - past
				}
			},
			
			next_grade () {
				var past = this.current_date.diff((moment().startOf('month')), 'days')
				var sum = moment().daysInMonth()
				return {
					percent: ((past / sum) * 100).toFixed(2),
					days: sum - past
				}
			},
			
			class_arr () {
				var grade_two = moment(this.start_date).add(3, 'month').startOf('month')
				var grade_three = moment(this.start_date).add(9, 'month').startOf('month')
				var grade_four = moment(this.start_date).add(15, 'month').startOf('month')
				return [this.start_date, grade_two, grade_three, grade_four, this.last_date]
			},
			
			class_diff () {
				return [
					this.class_arr[1].diff(this.class_arr[0], 'days'), // 이병기간
					this.class_arr[2].diff(this.class_arr[1], 'days'), // 일병기간
					this.class_arr[3].diff(this.class_arr[2], 'days'), // 상병기간
					this.class_arr[4].diff(this.class_arr[3], 'days'), // 병장기간
				] 
			},
			
			progress_arr () {
				return [Math.round(this.current_percent), Math.round(100 - this.current_percent)]
			},
			
			datacollection() {
				return {
					datasets: [{
						hoverBorderWidth: 5,
						backgroundColor: ['#64B5F6', '#4FC3F7', '#4DD0E1', '#80DEEA'],
						borderWidth: 4,
						data: this.class_diff,
						labels: [' 이병', ' 일병', ' 상병', ' 병장'],
					}, {
						hoverBorderWidth: 4,
						backgroundColor: ['#B39DDB', '#7986CB'],
						borderWidth: 4,
						data: this.progress_arr,
						labels: [' 지난 군생활', ' 남은 군생활'],
					}]
				}
			},
		},
		
		data: () => ({
			current_date: moment(),
		}),
	}
</script>