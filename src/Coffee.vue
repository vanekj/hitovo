<template>
	<div id="app">
		<div class="container">
			<div class="card">
				<div class="card-header">
					<div class="card-header-title">
						Select the brewing method
					</div>
				</div>
				<div class="card-content">
					<div class="columns">
						<div class="column">
							<label v-for="ratio in items.ratios" :key="ratio.value" style="display: block; padding: 3px 0;">
								<b-radio v-model="selected.ratio" name="ratio" :native-value="ratio.value" @input="calculateRatio(ratio)">
									<span :class="{ 'has-text-weight-medium': selected.ratio === ratio.value }">{{ ratio.label }}</span>
								</b-radio>
							</label>
						</div>
						<div class="column is-hidden-mobile">
							<div class="coffee-wrapper">
								<transition-group name="coffee-image-switch">
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
					<div class="card-header-title">
						Ratio
					</div>
				</div>
				<div class="card-content">
					<b-input :value="selected.ratio" size="is-medium" custom-class="has-text-centered" expanded disabled />
				</div>
			</div>
		</div>
		<div class="container">
			<div class="columns">
				<div class="column">
					<div class="card">
						<div class="card-header">
							<div class="card-header-title">
								Coffee
							</div>
						</div>
						<div class="card-content">
							<b-numberinput v-model="calculated.coffee" type="dark" min="1" controls-position="compact" size="is-medium" expanded @input="calculateWater" />
						</div>
					</div>
				</div>
				<div class="column">
					<div class="card">
						<div class="card-header">
							<div class="card-header-title">
								Water
							</div>
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
					ratio: null
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
				let [first, second] = selectedRatio.value.split(':');
				this.calculated.ratio = first / second;
				this.selected.ratio = selectedRatio.value;
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

<style lang="postcss">
	html {
		height: 100%;
	}

	body {
		min-height: 100%;
		user-select: none;
	}

	#app {
		margin: 0 auto;
		max-width: 500px;
		padding-right: 0.75rem;
		padding-left: 0.75rem;
	}

	.container {
		padding-top: 0.75rem;
		padding-bottom: 0.75rem;
	}

	.coffee-wrapper {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 100%;

		& span {
			position: relative;
			display: flex;
			justify-content: center;
			align-items: center;
			width: 100%;
			height: 130px;
			overflow: hidden;
		}

		& img {
			position: absolute;
			height: 100%;
		}
	}

	.coffee-image-switch-enter-active, .coffee-image-switch-leave-active {
		transition: all 300ms;
	}

	.coffee-image-switch-enter, .coffee-image-switch-leave-active {
		opacity: 0;
	}

	.coffee-image-switch-enter {
		transform: translateX(100px);
	}

	.coffee-image-switch-leave-active {
		transform: translateX(-100px);
	}

	.letter-image {
		height: 24px;
	}
</style>
