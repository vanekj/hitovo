<template>
	<div id="app">
		<fieldset>
			<legend>Select the brewing method</legend>
			<center>
				<img v-for="(ratio, index) in items.ratios" v-show="ratio.value === selected.ratio.value" :key="index" :src="`/assets/${ratio.image}.svg`" height="120" />
			</center>
			<br />
			<div v-for="(ratio, index) in items.ratios" :key="index">
				<label>
					<input name="ratio" type="radio" :value="ratio.value" :checked="ratio.value === selected.ratio.value" @change="calculateRatio(ratio)" />
					{{ ratio.label }} <small>({{ ratio.value }})</small>
				</label>
			</div>
		</fieldset>
		<br />
		<table cellpadding="0" cellspacing="0" style="width: 100%;">
			<tbody>
				<tr>
					<td>
						<fieldset>
							<legend>Coffee</legend>
							<input v-model="calculated.coffee" type="number" min="1" style="width: 100%;" @change="calculateWater" />
						</fieldset>
					</td>
					<td>
						<fieldset>
							<legend>Water</legend>
							<input v-model="calculated.water" type="number" min="1" style="width: 100%;" @change="calculateCoffee" />
						</fieldset>
					</td>
				</tr>
			</tbody>
		</table>
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
