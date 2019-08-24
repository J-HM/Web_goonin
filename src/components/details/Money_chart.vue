<script>
	import { Line, mixins } from 'vue-chartjs'
	const { reactiveProp } = mixins
	
	export default {
		extends: Line,
		mixins: [reactiveProp],
		props: {
			chartData: {
				type: Object,
				default: null
			},
		},
		data: () => ({
			options: {
				animation: {
					duration: 0
				},
				
				tooltips: {
					enabled: false
				},
				
				legend: {
					display: false
				},
				
				elements: {
					line: {
						tension: 0
					}
				},
				
				maintainAspectRatio: false,
				spangaps: false,
				scales: {
					
					xAxes: [{
						ticks: {
							autoSkipPadding: 0,
							maxRotation: 0,
						}
					}],
					
					yAxes: [{
						display: false,
						ticks: {
							callback: function(label, index, labels) {
								if (index == labels.length - 1) {
									return ''
								}
								return label/1000000+'백';
							}
						}
					}]
				}
			}
		}),
		mounted() {
			this.renderChart(this.chartData, this.options)
		},
	}
</script>