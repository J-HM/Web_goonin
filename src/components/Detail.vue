<template>
	<v-container>
		<v-row align='center' justify='center'>

			<v-col cols=12 md=12 lg=6>
				<Last :last_date='last_date' :start_date='start_date' class='mb-4' />
				<Progress :last_date='last_date' :start_date='start_date' :cut_day='cut_day' />
			</v-col>

			<v-col cols=12 md=12 lg=6>
				<Class :last_date='last_date' :start_date='start_date' />
			</v-col>

			<v-col cols=12 class='text-center ma-n2'>
				<v-btn icon color='#26C6DA' @click="moeny_view">
					<v-icon :class='icon'>mdi-triangle-outline</v-icon>
				</v-btn>
			</v-col>

			<v-expand-transition>
				<v-col v-show='show'>
					<Money :last_date='last_date' :start_date='start_date' />
				</v-col>
			</v-expand-transition>

		</v-row>
	</v-container>
</template>

<script>
	import Progress from './details/Progress';
	import Last from './details/Last';
	import Money from './details/Money';
	import Class from './details/Class';
	import moment from 'moment';
	export default {
		props: {
			date: String,
			sort: String,
		},
		components: {
			Last,
			Progress,
			Money,
			Class,
		},
		methods: {
			moeny_view() {
				this.show = !this.show
				if (this.show) { this.icon = 'mdi-rotate' }
				else { this.icon = 'mdi-rotate-180' }
			}
		},
		computed: {
			start_date() {
				return moment(this.date);
			}, // 입대일
			last_date() {
				return moment(this.origin_last_date).subtract(this.cut_day, 'days');
			}, // 전역일
			origin_last_date() {
				return moment(this.start_date).add(this.origin_month, 'month').subtract(1, 'days');
			}, // 기존 전역일
			origin_month() {
				if (this.classified == 1) {return 21 }
				else if (this.classified == 2) { return 23 } 
				else { return 24 }
			}, // 기존 복무 개월
			ref_date() {
				if (this.classified == 1) { return moment("170103", 'YYMMDD') } 
				else if (this.classified == 2) { return moment("161103", 'YYMMDD') } 
				else { return moment("161003", 'YYMMDD') }
			}, // 복무일수 단축 시작일
			cut_day() {
				let temp = Math.floor(moment.duration(this.start_date.diff(this.ref_date)).asDays() / 14 + 1);
				if (this.classified == 4 && temp > 60) { return 60 }
				if (temp > 90) { return 90 }
				else if (temp < 0) { return 0 } 
				else { return temp }
			}, // 단축일 수
			classified() {
				if (this.sort == '해군') { return 2 } 
				else if (this.sort == '공군') { return 4 } 
				else if (this.sort == '의무해경') { return 2 }
				else if (this.sort == '의무소방') { return 2 }
				else if (this.sort == '사회복무요원') { return 3 }
				else { return 1 }
			}, // 분류
		},
		data: () => ({
			show: false,
			icon: 'mdi-rotate-180',
		})
	}
</script>