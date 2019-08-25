<template>
	<v-card elevation='3'>
		<v-row justify='center' align='center'>
			<v-col cols=11>
				<Money_chart
					class='mt-2'
					style='height: 200px' 
					:chart-data='datacollection'
				></Money_chart>
			</v-col>
			<v-col cols=11 lg=5>
				<v-slider
					class='mb-5'
					thumb-label="always"
					label="군적금"
					:rules="rules"
					ticks
					color='#4DD0E1'
					track-color='#E0F7FA'
					append-icon="mdi-plus-box-outline"
					prepend-icon="mdi-minus-box-outline"
					@click:append="saving_up"
					@click:prepend="saving_down"
					max="400000" 
					step="10000"
					v-model="saving_month"
				><template v-slot:thumb-label="props">{{ thumb(props.value) }}</template>
				</v-slider>
				
				<v-slider
					thumb-label="always"
					:rules="rules"
					label="생활비"
					color='#80CBC4'
					ticks
					track-color='#E0F2F1'
					append-icon="mdi-plus-box-outline"
					prepend-icon="mdi-minus-box-outline"
					@click:append="expense_up"
					@click:prepend="expense_down"
					step="10000" 
					max="500000" 
					v-model="expense_month"
				><template v-slot:thumb-label="props">{{ thumb(props.value) }}</template>
				</v-slider>
			</v-col>
				
			<v-col cols=11 lg=6 class='mt-n5'>
				<v-row>
					<v-col>
						<v-card dark flat color="#9575CD" class="white--text">
						<v-card-text>
							<div class="">군생활 총월급</div>
							<span class="white--text title">
								{{ print_money(salary_arr[salary_arr.length - 1]) }}
							</span>
						</v-card-text>
						</v-card>
					</v-col>
						
					<v-col>
						<v-card outlined>
						<v-card-text>
							<div>군적금 수령액</div>
							<span class='title black--text'>
								{{ print_money(saving_arr[saving_arr.length - 1]) }}
							</span>
						</v-card-text>
						</v-card>
					</v-col>
				</v-row>
					
				<v-row>
					<v-col>
						<v-card outlined>
						<v-card-text>
							<div> 군생활 생활비
								<v-icon class='mdi-18px'>mdi-information-outline</v-icon>
							</div>
							
							<span class='title black--text'>
								{{ print_money(expense_arr[expense_arr.length - 1]) }}
							</span>
							
						</v-card-text>
						</v-card>
					</v-col>
					
					<v-col>
						<v-card dark flat color="#64B5F6" class="white--text">
						<v-card-text>
							<div>군생활 끝나면</div>
							<span class="white--text title">
								{{ print_money(salary_arr[salary_arr.length - 1] - minus_arr[expense_arr.length - 1]) }}
							</span>
						</v-card-text>
						</v-card>
					</v-col>
				</v-row>
				
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
			rules () {
				return [
					(this.salary_arr[this.salary_arr.length - 1] - this.minus_arr[this.expense_arr.length - 1]) > 0|| '마이너스 입니다',
				]
			},
			
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
					label_arr.push(this.salary_days[i].format('YY.M'))
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
					saving_sum += this.saving_month * 1.05
					saving_arr.push(saving_sum)
				}
				return saving_arr
			},
			
			expense_arr() {
				var expense_arr = new Array()
				var expense_sum = 0
				for (var i = 0; i < this.salary_days.length; i++) {
					expense_sum += this.expense_month
					expense_arr.push(expense_sum)
				}
				return expense_arr
			},
			
			minus_arr() {
				var minus_arr = new Array()
				var minus_sum = 0
				for (var i = 0; i < this.salary_days.length; i++) {
					minus_sum += this.expense_month + this.saving_month
					minus_arr.push(minus_sum)
				}
				return minus_arr
			},
			
			datacollection () {
				return {
					labels: this.label_arr,
					
					datasets: [{
						data: this.salary_arr,
						fill: false,
						borderColor: '#BBDEFB',
						borderWidth: 4,
						pointRadius: 1,
					}, {
						data: this.saving_arr,
						fill: false,
						borderColor: '#C5CAE9',
						pointRadius: 1,
					}, {
						data: this.minus_arr,
						backgroundColor: '#B2DFDB33',
						fill: true,
						borderColor: '#D1C4E9',
						pointRadius: 1,
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
			},
			
			print_money: function (money) {
				return money.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
			},
			
			saving_up () {
				this.saving_month += 10000
			},
			saving_down () {
				this.saving_month -= 10000
			},
			expense_up () {
				this.expense_month += 10000
			},
			expense_down () {
				this.expense_month -= 10000
			},
			
			thumb (val) {
				return val/10000 + '만'
			},
		},
		
		data: () => ({
			
			current_date: moment(),
			saving_month: 0,
			expense_month: 0,
			
			salary_data: {
				2010: [73500 , 79500 , 88000 ,  97500],
				2011: [78300 , 84700 , 93700 , 103800],
				2012: [81500 , 88200 , 97500 , 108000],
				2013: [97800 , 105800, 117000, 129600],
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