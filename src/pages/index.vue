<template>
	<p>Select the brewing method</p>
	<label v-for="ratio in ratios" :key="`label-${ratio.label}`">
		<input
			v-model="selectedRatio.label"
			type="radio"
			name="ratio"
			:value="ratio.label"
			@input="selectRatio(ratio)"
		/>
		{{ ratio.label }}
	</label>
	<div>
		<img
			v-for="ratio in ratios"
			v-show="ratio.label === selectedRatio.label"
			:key="`img-${ratio.label}`"
			:src="`/assets/${ratio.image}.svg`"
			height="240"
		/>
	</div>
	<p>Ratio</p>
	<input v-model="selectedRatio.ratio[0]" type="number" min="1" @input="calculateRatio" />
	<input v-model="selectedRatio.ratio[1]" type="number" min="1" @input="calculateRatio" />
	<p>Coffee</p>
	<input v-model="coffeeAmount" type="number" min="1" @input="calculateWater" />
	<p>Water</p>
	<input v-model="waterAmount" type="number" min="1" @input="calculateCoffee" />
</template>

<script lang="ts">
import { Ratio } from '../types/ratio';
import { ratios, v60 } from '../constants/ratios';
import { cloneDeep } from '../utils/clone-deep';

export default {
	setup() {
		// Define reactive variable for selected ratio
		const defaultRatio = ratios.find((ratio) => ratio.default);
		const selectedRatio = ref(cloneDeep(defaultRatio || v60));
		// Defien reactive variables for coffee, water and ratio
		const coffeeAmount = ref(15);
		const waterAmount = ref(250);
		const calculatedRatio = computed(() => {
			const [coffeeRatio, waterRatio] = selectedRatio.value.ratio;
			return coffeeRatio / waterRatio;
		});
		// Define ratio calculation methods
		const calculateCoffee = () => {
			coffeeAmount.value = Math.round(waterAmount.value * calculatedRatio.value);
		};
		const calculateWater = () => {
			waterAmount.value = Math.round(coffeeAmount.value / calculatedRatio.value);
		};
		const calculateRatio = () => {
			coffeeAmount.value = Math.round(waterAmount.value * calculatedRatio.value);
			waterAmount.value = Math.round(coffeeAmount.value / calculatedRatio.value);
		};
		// Define ratio selection method
		const selectRatio = (newSelectedRatio: Ratio) => {
			selectedRatio.value = cloneDeep(newSelectedRatio);
			calculateRatio();
		};
		// Return data into templates
		return {
			ratios,
			selectedRatio,
			coffeeAmount,
			waterAmount,
			selectRatio,
			calculateCoffee,
			calculateWater,
			calculateRatio
		};
	}
};
</script>
