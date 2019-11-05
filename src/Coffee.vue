<template>
	<div id="app">
		<fieldset>
			<legend>Select the brewing method</legend>
			<table cellpadding="0" cellspacing="0" style="width: 100%;">
				<tbody>
					<tr>
						<td style="width: 50%">
							<label v-for="ratio in items.ratios" :key="ratio.value" style="display: block; padding: 3px 0;">
								<input name="ratio" type="radio" :value="ratio.value" :checked="ratio.value === selected.ratio.value" @change="calculateRatio(ratio)" />
								<strong>&nbsp;{{ ratio.label }}</strong>
							</label>
						</td>
						<td style="width: 50%;">
							<div class="coffee-wrapper">
								<transition-group name="coffee-image-switch">
									<img v-for="ratio in items.ratios" v-show="ratio.value === selected.ratio.value" :key="ratio.value" :src="`/assets/coffee/${ratio.image}.svg`" />
								</transition-group>
							</div>
						</td>
					</tr>
				</tbody>
			</table>
		</fieldset>
		<fieldset>
			<legend>Ratio</legend>
			<div style="font-size: 200%; font-weight: bold; text-align: center;">{{ selected.ratio.value }}</div>
		</fieldset>
		<table cellpadding="0" cellspacing="0" style="width: 100%;">
			<tbody>
				<tr>
					<td style="width: 50%">
						<fieldset>
							<legend>Coffee</legend>
							<input v-model="calculated.coffee" type="number" min="1" style="width: 100%; font-size: 200%; font-weight: bold; text-align: center;" @input="calculateWater" />
						</fieldset>
					</td>
					<td style="width: 50%">
						<fieldset>
							<legend>Water</legend>
							<input v-model="calculated.water" type="number" min="1" style="width: 100%; font-size: 200%; font-weight: bold; text-align: center;" @input="calculateCoffee" />
						</fieldset>
					</td>
				</tr>
			</tbody>
		</table>
		<center>
			<br />
			<img src="/assets/letters/c_h.png" alt="H" height="32" />
			<img src="/assets/letters/c_i.png" alt="I" height="32" />
			<img src="/assets/letters/c_t.png" alt="T" height="32" />
			<img src="/assets/letters/c_o.png" alt="O" height="32" />
			<img src="/assets/letters/c_v.png" alt="V" height="32" />
			<img src="/assets/letters/c_o.png" alt="O" height="32" />
			<img src="/assets/letters/c_exclamation.png" alt="!" height="32" />
		</center>
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
				this.selected.ratio = selectedRatio;
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
	#app {
		margin: 1rem auto;
		max-width: 450px;
		font-family: system-ui;
		user-select: none;
	}

	.coffee-wrapper {
		position: relative;
		height: 130px;
		text-align: center;
		overflow: hidden;

		& span {
			display: flex;
			justify-content: center;
			align-items: center;
			width: 100%;
			height: 100%;
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
</style>
