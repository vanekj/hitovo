import { Ratio } from '../types/ratio';

export const v60: Ratio = {
	ratio: [3, 50],
	label: 'V60',
	image: 'v60',
	default: true
};

export const chemex: Ratio = {
	ratio: [1, 17],
	label: 'Chemex',
	image: 'chemex',
	default: false
};

export const aeropress: Ratio = {
	ratio: [2, 25],
	label: 'Aeropress',
	image: 'aeropress',
	default: false
};

export const frenchPress: Ratio = {
	ratio: [1, 15],
	label: 'French Press',
	image: 'frenchpress',
	default: false
};

export const mokaPot: Ratio = {
	ratio: [1, 9],
	label: 'Moka Pot',
	image: 'mokapot',
	default: false
};

export const coldBrew: Ratio = {
	ratio: [1, 10],
	label: 'Cold Brew',
	image: 'v60',
	default: false
};

export const ratios = [v60, chemex, aeropress, frenchPress, mokaPot, coldBrew];
