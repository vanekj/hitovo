<template>
	<div id="app">
		<div class="container has-text-centered is-size-7">
			<p>
				The app is in early stages of <a href="https://github.com/hitovo/hitovo">development</a>, so please be patient with it 😇<br />
				Ping me your questions, problems and ideas on <a href="mailto:info@jakub-vanek.eu">info@jakub-vanek.eu</a>
			</p>
		</div>
		<div class="container">
			<div class="card">
				<div class="card-header">
					<div class="card-header-title">Select the brewing method</div>
				</div>
				<div class="card-content">
					<div class="columns">
						<div class="column">
							<label v-for="ratio in items.ratios" :key="ratio.value" class="h-label">
								<b-radio v-model="selected.ratio" name="ratio" :native-value="ratio.value" @input="calculateRatio(ratio)">
									<span :class="{ 'has-text-weight-medium': selected.ratio === ratio.value }">{{ ratio.label }}</span>
								</b-radio>
							</label>
						</div>
						<div class="column">
							<div class="h-images h-very-center">
								<transition-group name="fade">
									<img v-for="ratio in items.ratios" v-show="ratio.value === selected.ratio" :key="ratio.value" :src="`/assets/${ratio.image}.svg`" />
								</transition-group>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="container">
			<div class="card">
				<div class="card-header">
					<div class="card-header-title">Ratio</div>
				</div>
				<div class="card-content">
					<div class="columns is-gapless">
						<div class="column">
							<b-numberinput v-model="selected.customRatio[0]" type="dark" min="1" controls-position="compact" size="is-medium" expanded @input="customRatio" />
						</div>
						<div class="column is-2 is-size-4 has-text-weight-bold h-very-center">:</div>
						<div class="column">
							<b-numberinput v-model="selected.customRatio[1]" type="dark" min="1" controls-position="compact" size="is-medium" expanded @input="customRatio" />
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="container">
			<div class="columns">
				<div class="column">
					<div class="card">
						<div class="card-header">
							<div class="card-header-title">Coffee</div>
						</div>
						<div class="card-content">
							<b-numberinput v-model="calculated.coffee" type="dark" min="1" controls-position="compact" size="is-medium" expanded @input="calculateWater" />
						</div>
					</div>
				</div>
				<div class="column">
					<div class="card">
						<div class="card-header">
							<div class="card-header-title">Water</div>
						</div>
						<div class="card-content">
							<b-numberinput v-model="calculated.water" type="dark" min="1" controls-position="compact" size="is-medium" expanded @input="calculateCoffee" />
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				items: {
					ratios: [{
						value: '3:50',
						label: 'V60',
						image: 'v60'
					}, {
						value: '1:17',
						label: 'Chemex',
						image: 'chemex'
					}, {
						value: '1:6',
						label: 'Aeropress',
						image: 'aeropress'
					}, {
						value: '1:12',
						label: 'French Press',
						image: 'frenchpress'
					}, {
						value: '1:10',
						label: 'Moka Pot',
						image: 'mokapot'
					}, {
						value: '9:40',
						label: 'Cold Brew',
						image: 'v60'
					}]
				},
				selected: {
					ratio: null,
					customRatio: [0, 0]
				},
				calculated: {
					ratio: null,
					coffee: 15,
					water: 250
				}
			};
		},
		watch: {
			selected: {
				handler() {
					this.calculateWater();
					this.calculateCoffee();
				},
				deep: true
			}
		},
		created() {
			this.calculateRatio(this.items.ratios[0]);
		},
		methods: {
			calculateRatio(selectedRatio) {
				let ratioArray = selectedRatio.value.split(':').map(Number);
				this.calculated.ratio = ratioArray[0] / ratioArray[1];
				this.selected.ratio = selectedRatio.value;
				this.selected.customRatio = ratioArray;
			},
			customRatio() {
				let ratioString = this.selected.customRatio.join(':'),
					matchingRatio = this.items.ratios.find((ratio) => ratio.value === ratioString);
				if (matchingRatio) {
					this.calculateRatio(matchingRatio);
				} else {
					this.calculateRatio({
						value: ratioString
					});
				}
			},
			calculateWater() {
				this.calculated.water = Math.round(this.calculated.coffee / this.calculated.ratio);
			},
			calculateCoffee() {
				this.calculated.coffee = Math.round(this.calculated.water * this.calculated.ratio);
			}
		}
	};
</script>

<style lang="scss">
	/* Custom variables */
	$coffee: #ae7d5b;

	/* Import Bulma variables */
	@import "~bulma/sass/utilities/_all";

	/* Override Bulma variables */
	$primary: $coffee;

	/* Import the rest of framework */
	@import "~bulma";
	@import "~buefy/src/scss/buefy";

	/* Custom styles */
	html {
		height: 100%;
	}

	body {
		min-height: 100%;
		background-color: $white-bis;
	}

	#app {
		margin: 0 auto;
		max-width: 500px;
		padding-right: $column-gap;
		padding-left: $column-gap;
	}

	.container {
		padding-top: $column-gap;
		padding-bottom: $column-gap;
	}

	.h-label {
		display: block;
		padding: 5px 0;
	}

	.h-images {
		height: 100%;

		span {
			position: relative;
			display: flex;
			justify-content: center;
			align-items: center;
			width: 100%;
			height: 130px;
			overflow: hidden;
		}

		img {
			position: absolute;
			height: 100%;
		}
	}

	.h-very-center {
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.fade-enter-active,
	.fade-leave-active {
		transition: all 300ms;
	}

	.fade-enter,
	.fade-leave-active {
		opacity: 0;
	}

	.fade-enter {
		transform: translateX(100px);
	}

	.fade-leave-active {
		transform: translateX(-100px);
	}
</style>
