<template>
	<div v-if="selected" id="app">
		<div class="container">
			<div class="card">
				<div class="card-header">
					<div class="card-header-title">Select the brewing method</div>
				</div>
				<div class="card-content">
					<div class="columns">
						<div class="column">
							<label v-for="ratio in items.ratios" :key="ratio.label" class="h-label">
								<b-radio v-model="selected.label" name="ratio" :native-value="ratio.label" @input="selectRatio(ratio)">
									<span :class="{ 'has-text-weight-medium': selected.label === ratio.label }">{{ ratio.label }}</span>
								</b-radio>
							</label>
						</div>
						<div class="column">
							<div class="h-images h-very-center">
								<transition-group name="fade">
									<img v-for="ratio in items.ratios" v-show="ratio.label === selected.label" :key="ratio.label" :src="`/assets/${ratio.image}.svg`" />
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
							<b-numberinput v-model="selected.value[0]" type="dark" min="1" controls-position="compact" size="is-medium" expanded />
						</div>
						<div class="column is-2 is-size-4 has-text-weight-bold h-very-center">:</div>
						<div class="column">
							<b-numberinput v-model="selected.value[1]" type="dark" min="1" controls-position="compact" size="is-medium" expanded />
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
							<b-numberinput v-model="calculated.coffee" type="dark" min="1" controls-position="compact" size="is-medium" expanded @input="calculate" />
						</div>
					</div>
				</div>
				<div class="column">
					<div class="card">
						<div class="card-header">
							<div class="card-header-title">Water</div>
						</div>
						<div class="card-content">
							<b-numberinput v-model="calculated.water" type="dark" min="1" controls-position="compact" size="is-medium" expanded @input="calculate" />
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import _cloneDeep from 'lodash.clonedeep';

	export default {
		data() {
			return {
				items: {
					ratios: [{
						value: [3, 50],
						label: 'V60',
						image: 'v60',
						default: true
					}, {
						value: [1, 17],
						label: 'Chemex',
						image: 'chemex'
					}, {
						value: [2, 25],
						label: 'Aeropress',
						image: 'aeropress'
					}, {
						value: [1, 15],
						label: 'French Press',
						image: 'frenchpress'
					}, {
						value: [1, 9],
						label: 'Moka Pot',
						image: 'mokapot'
					}, {
						value: [1, 10],
						label: 'Cold Brew',
						image: 'v60'
					}]
				},
				selected: null,
				calculated: {
					coffee: 15,
					water: 250
				}
			};
		},
		computed: {
			defaultRatio() {
				return this.items.ratios.find((ratio) => ratio.default);
			}
		},
		watch: {
			selected: {
				handler() {
					this.calculate();
				},
				deep: true
			}
		},
		created() {
			this.selectRatio(this.defaultRatio);
		},
		methods: {
			selectRatio(selectedRatio) {
				this.selected = _cloneDeep(selectedRatio);
			},
			calculate() {
				let ratio = this.selected.value[0] / this.selected.value[1];
				this.calculated.water = Math.round(this.calculated.coffee / ratio);
				this.calculated.coffee = Math.round(this.calculated.water * ratio);
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
