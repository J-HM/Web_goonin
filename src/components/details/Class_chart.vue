<script>
	import { Doughnut, mixins } from 'vue-chartjs'
	const { reactiveProp } = mixins
	
	export default {
		extends: Doughnut,
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
					duration: 2000
				},
				maintainAspectRatio: false,
				cutoutPercentage: 80,
				rotation: (-0.725 * Math.PI),
				circumference: (0.45 * Math.PI),
				legend: {
					display: false
				},
				tooltips: {
					displayColors: false,
					backgroundColor: 'rgba(100, 100, 100, 0.7)',
					bodyFontSize: 14,
					bodySpacing: 25,
					callbacks: {
						label: function(tooltipItem, data) {
							var dataset = data.datasets[tooltipItem.datasetIndex];
							var index = tooltipItem.index;
							if (dataset.data.length == 4) {
								return dataset.labels[index] + '으로 ' + dataset.data[index] + '일 '
							} else {
								return dataset.labels[index] + '은 ' + dataset.data[index] + '% '
							}
						}
					}
				}
			}
		}),
		mounted() {
			this.renderChart(this.chartData, this.options)
		},
	}
</script>