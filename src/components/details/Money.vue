<template>
	<v-card elevation='3'>
		<v-row justify='center'>
			<v-col cols=12>

			</v-col>
			<v-col cols=11 lg=5 class='mt-3'>
				<div class='mb-n2 ml-2'> 적금: {{ saving_month / 10000 }}만 </div>
				
				<v-slider 
					track-color="#5E35B133" 
					color="#9575CD" 
					max="400000" 
					step="10000"
					v-model="saving_month"
				></v-slider>
				
				<div class='mt-n5 mb-n2 ml-2'> 생활비: {{ expense_month / 10000 }}만 </div>
				
				<v-slider 
					track-color="#42A5F533" 
					color="#7986CB" 
					step="10000" 
					max="500000" 
					v-model="expense_month"
				></v-slider>
			</v-col>

			<v-col cols=11 lg=5>
				<p>
					총 월급 {{ salary_arr[this.salary_arr.length - 1] }} 적금 수령액 {{ saving_arr[this.saving_arr.length - 1] }}
				</p>
			</v-col>
		</v-row>
	</v-card>

</template>

<script>
	import moment from 'moment';
	
	export default {
		props: ['start_date', 'last_date'],
		computed: {
			value() {
				return null
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
				for (var i = 0; i < this.salary_days.length; i++) {
					salary_sum += this.salary_month * i
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
		},
		
		data: () => ({
			gradient: ['#42A5F5', '#5C6BC0', '#7E57C2'],
			current_date: moment(),
			salary_month: 400000,
			saving_month: 300000,
			expense_month: 50000,
		}),
	}
</script>