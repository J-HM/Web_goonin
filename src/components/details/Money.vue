<template>
	<v-card elevation='3'>
		<v-row justify='center'>
			<v-col cols=12>
				<Money_chart :chart-data='datacollection'></Money_chart>
			</v-col>
			<v-col cols=11 lg=5 class='mt-3'>
				<div class='mb-n2 ml-2'> 적금: {{ saving_month / 10000 }}만 </div>
				
				<v-slider 
					track-color="#b235B1" 
					color="#9575CD" 
					max="400000" 
					step="10000"
					v-model="saving_month"
				></v-slider>
				<div class='mt-n5 mb-n2 ml-2'> 생활비: {{ expense_month / 10000 }}만 </div>
				<v-slider 
					track-color="#42A5F5" 
					color="#7986CB" 
					step="10000" 
					max="500000" 
					v-model="expense_month"
				></v-slider>
			</v-col>
				
			<v-col cols=11 lg=5>
				<p>
					총 월급 {{ salary_arr[salary_arr.length - 1] }} 적금 수령액 {{ saving_arr[saving_arr.length - 1] }}
				</p>
			</v-col>
		</v-row>
	</v-card>

</template>

<script>
	import Money_chart from './Money_chart'
	import moment from 'moment';
	
	export default {
		props: ['start_date', 'last_date'],
		
		components: {
			Money_chart
		},
			
		computed: {
			value() {
				return null
			},
				
			class_arr() {
				var grade_two = moment(this.start_date).add(4, 'month').startOf('month')
				var grade_three = moment(this.start_date).add(11, 'month').startOf('month')
				var grade_four = moment(this.start_date).add(18, 'month').startOf('month')
				return [this.start_date, grade_two, grade_three, grade_four, this.last_date]
			},
				
			salary_days() {
				var salary_days = new Array()
				var salary_day = moment(this.start_date).startOf('month').add(9, 'day')
				while (salary_day < this.last_date) {
					salary_days.push(moment(salary_day))
					salary_day.add(1, 'month').startOf('month').add(9, 'day')
				}
				return salary_days
			},
			
			label_arr() {
				var label_arr = new Array()
				for (var i = 0; i < this.salary_days.length; i++) {
					label_arr.push(this.salary_days[i].format('YY MM DD'))
				}
				return label_arr
			},
			
			salary_arr() {
				var salary_arr = new Array()
				var salary_sum = 0
				var year,cls
				for (var i = 0; i < this.salary_days.length; i++) {
					year = this.salary_days[i].format('YYYY')
					cls = this.which_class(this.salary_days[i])
					salary_sum += this.salary_data[year][cls]
					salary_arr.push(salary_sum)
				}
				return salary_arr
			},
			
			saving_arr() {
				var saving_arr = new Array()
				var saving_sum = 0
				for (var i = 0; i < this.salary_days.length; i++) {
					saving_sum += this.saving_month * i
					saving_arr.push(saving_sum)
				}
				return saving_arr
			},
			
			expense_arr() {
				var expense_arr = new Array()
				var expense_sum = 0
				for (var i = 0; i < this.salary_days.length; i++) {
					expense_sum += this.expense_month * i
					expense_arr.push(expense_sum)
				}
				return expense_arr
			},
			
			sum_arr() {
				var sum_arr = new Array()
				for (var i = 0; i < this.salary_days.length; i++) {
					sum_arr.push(this.salary_arr[i] - this.expense_month[i])
				}
				return sum_arr
			},
			
			Sum_money() {
				return this.salary_arr[this.salary_arr.length - 1] - this.expense_arr[this.expense_arr.length - 1]
			},
			
			datacollection () {
				return {
					datasets: [{
						data: this.salary_arr,
						
					}, {
						data: this.expense_arr,
						
					}]
				}
			},
		},
		
		methods: {
			which_class: function (when) {
				if (this.class_arr[1] > when) { return 0 } 
				else if (this.class_arr[2] > when) { return 1 } 
				else if (this.class_arr[3] > when) { return 2 } 
				else { return 3 } 
			}
		},
		
		data: () => ({
			current_date: moment(),
			saving_month: 300000,
			expense_month: 50000,
			
			salary_data: {
				2010: [73500, 79500, 88000, 97500],
				2011: [78300, 84700, 93700, 103800],
				2012: [81500, 88200, 97500, 108000],
				2013: [97800, 105800, 117000, 129600],
				2014: [112500, 121700, 134600, 149000],
				2015: [129400, 140000, 154800, 171400],
				2016: [148800, 161000, 178000, 197100],
				2017: [163000, 176400, 195000, 216000],
				2018: [306100, 331300, 366200, 405700],
				2019: [306100, 331300, 366200, 405700],
				2020: [408173, 441728, 488305, 540892],
				2021: [408173, 441728, 488305, 540892],
				2022: [510000, 552000, 610100, 676100],
			}
		}),
	}
</script>