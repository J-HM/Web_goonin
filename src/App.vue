<template>
	<v-app>
		<v-container fill-height fluid>
			<v-row justify="center">
				<v-col cols='11' sm='8' md='6' lg='7' xl='5'>
					<v-card raised>
						<v-tooltip top>
							<template v-slot:activator="{ on }">
								<v-btn icon small color='primary' class='ma-2 mb-n4' v-on="on">
									<v-icon>mdi-information</v-icon>
								</v-btn>
							</template>
							<span>병무청 자료를 기반으로 계산되며 <br> 결과는 다소 오차가 있을 수 있음 <br> 계산된 결과는 행정효력이 없음</span>
						</v-tooltip>
						<Basic @finish="show_detail" />
						<v-expand-transition>
							<Detail v-if="show" :sort='sort' :date='date' />
						</v-expand-transition>
					</v-card>
				</v-col>
			</v-row>
		</v-container>
		<v-footer>
			<v-menu offset-y top>
				<template v-slot:activator="{ on }">
					<v-btn v-on="on" icon max-height='25'>
						<v-icon>mdi-plus-circle-outline</v-icon>
					</v-btn>
				</template>
				<v-list>
					<v-list-item-group v-model="item">
						<v-list-item v-for="(item, index) in items" :key="index">
							<v-list-item-icon class='mr-n1 pr-3'>
								<v-icon v-text="item.icon"></v-icon>
							</v-list-item-icon>
							<v-list-item-content class='mr-1'>
								<v-list-item-title v-text="item.text"></v-list-item-title>
							</v-list-item-content>
						</v-list-item>
					</v-list-item-group>
				</v-list>
			</v-menu>
			<v-spacer></v-spacer>
			<div>&copy; 2019.
				<v-tooltip top>
					<template v-slot:activator="{ on }">
						<strong v-on="on">Rotanyx</strong>
					</template>
					<span>rotanyx@gmail.com</span>
				</v-tooltip>
				All rights reserved.
			</div>
		</v-footer>
			<v-overlay :dark='false' :value="overlay_1" class='align-end justify-start'>
				<Tendinous @back1='back' class='ma-4'></Tendinous>
			</v-overlay>
			<v-overlay :dark='false' :value="overlay_2" class='align-end justify-start'>
				<Evaluation @back2='back' class='ma-4'></Evaluation>
			</v-overlay>
		
	</v-app>
</template>

<script>
	import Basic from './components/Basic';
	import Detail from './components/Detail';
	import Tendinous from './components/interactions/Tendinous';
	import Evaluation from './components/interactions/Evaluation';
	export default {
		components: {
			Basic,
			Detail,
			Tendinous,
			Evaluation
		},
		data: () => ({
			overlay_1: false,
			overlay_2: false,
			item: null,
			sheet: false,
			show: false,
			date: null,
			sort: null,
			model: null,
			items: [{
				text: '소스보기',
				icon: 'mdi-code-braces'
			}, {
				text: '건의하기',
				icon: 'mdi-message-text-outline'
			}, {
				text: '평가하기',
				icon: 'mdi-star-outline'
			}, ],
		}),
		methods: {
			show_detail(date, sort) {
				this.message = '상세정보';
				this.date = date;
				this.sort = sort;
				this.show = true;
			},
			back() {
				this.overlay_1 = false
				this.overlay_2 = false
				this.item = null
			}
		},
		watch: {
			item(val) {
				if (val == 0) {
					window.open('https://github.com/rotanyx/Web_goonin', '_blank')
				} else if (val == 1) {
					this.overlay_1 = !this.overlay_1
				} else if (val == 2) {
					this.overlay_2 = !this.overlay_2
				}
			}
		}
	};
</script>