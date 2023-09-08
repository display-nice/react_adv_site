import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FiltersState {
	activeFilter: {
		'all': boolean,
		'estate': boolean,
		'laptops': boolean,
		'camera': boolean,
		'cars': boolean,
	},
	cameraFilter: {
		cameraType: string, // possible values (string): mirror, digital, mirrorless
		resolutionMatrix: string, // possible values (string): 1mp, 3mp, 5mp, 7mp, 10mp
		resolutionVideo: string, // possible values (string): any, HD, Full HD, 4k, 5k
	},
	carFilter: {
		minimalYear: string, // possible values (string): 1900, 1940, 1960, 1980, 2000
		transmission: string, // possible values (string): any, mechanical, auto
		bodyType: string, // possible values (string): sedan, universal, hatchback, jeep, cupe
	},
	laptopFilter: {
		laptopType: string, // possible values (string): ultra, home, gaming
		ramValue: string,  // possible values (string): any, 4gb, 8gb, 16gb
		screenDiagonal: number,  // possible values (number): 13, 14, 15, 17
		processorType: string,  // possible values (string): i3, i5, i7
	},
	estateFilter: {		
		estateType: string, // possible values (string): house, flat, apartments
		minSquare: number, // possible values (number): any number
		roomsQuantity: string, // possible values (string): any, 1, 2, 3, 4, 5+
	},
	rangeFilter: {
		minPrice: number,
		maxPrice: number,
		prices: number[]
	},
}

type filterParam = {	
	filter: string,
	type: string,
	name: string,
	value: string,
	checked?: boolean
}

const initialState = {
	activeFilter: {
		'all': false,
		'estate': false,
		'laptops': true,
		'camera': false,
		'cars': false,
	},
	cameraFilter: {
		cameraType: '', // possible values: null, (string): mirror, digital, mirrorless
		resolutionMatrix: "1mp", // possible values (string): 1mp, 3mp, 5mp, 7mp, 10mp
		resolutionVideo: "any", // possible values (string): any, HD, Full HD, 4k, 5k
	},
	carFilter: {
		minimalYear: "1900", // possible values (string): 1900, 1940, 1960, 1980, 2000
		transmission: "any", // possible values (string): any, mechanical, auto
		bodyType: "sedan", // possible values (string): sedan, universal, hatchback, jeep, cupe
	},
	laptopFilter: {
		laptopType: [
			{name: "laptopType", text: 'Ультрабук', value: 'ultra', checked: false},
			{name: "laptopType", text: 'Домашний ноутбук', value: 'home', checked: false},
			{name: "laptopType", text: 'Игровой ноутбук', value: 'gaming', checked: false}
		],
		laptopRamValue: [
			{name: 'laptopRamValue', text: 'Любой', value: 'any', checked: true},
			{name: 'laptopRamValue', text: '4 Гб', value: '4gb', checked: false},
			{name: 'laptopRamValue', text: '8 Гб', value: '8gb', checked: false},
			{name: 'laptopRamValue', text: '16 Гб', value: '16gb', checked: false},
		],
		laptopDiagonal: [
			{name: 'laptopDiagonal', text: 'Любая', value: 'any', checked: true},
			{name: 'laptopDiagonal', text: '13″', value: '13in', checked: false},
			{name: 'laptopDiagonal', text: '14″', value: '14in', checked: false},
			{name: 'laptopDiagonal', text: '15″', value: '15in', checked: false},
			{name: 'laptopDiagonal', text: '17″', value: '16in', checked: false},
		],
		laptopProcType: [
			{name: 'laptopProcType', text: 'Intel Core i3', value: 'i3', checked: false},
			{name: 'laptopProcType', text: 'Intel Core i5', value: 'i5', checked: false},
			{name: 'laptopProcType', text: 'Intel Core i7', value: 'i7', checked: false},
		],
	},
	estateFilter: {
		estTypes: [
			{text: 'Дом', value: 'house', checked: false},
			{text: 'Квартира', value: 'flat', checked: false},
			{text: 'Апартаменты', value: 'apartments', checked: false}
		],
		minSquare: 0, // possible values (number): any number
		roomsQuantity: [
			{text: 'Любое', value: 'any', checked: false},
			{text: '1', value: 'one', checked: false}, 
			{text: '2', value: 'two', checked: false}, 
			{text: '3', value: 'three', checked: false}, 
			{text: '4', value: 'four', checked: false}, 
			{text: '5+', value: 'fivemore', checked: false}
		],		
	},
	rangeFilter: {
		minPrice: 2,
		maxPrice: 200,
		selectedPrices: [2, 200]
	},
}

const FiltersSlice = createSlice({
	name: "FiltersSlice",
	initialState,	
	reducers: {
		setActiveFilter(state, action: PayloadAction<string>): void {			
			for (let key in state.activeFilter) {
				if (key === action.payload) {
					state.activeFilter[`${key}`] = true;
				} else state.activeFilter[`${key}`] = false;
			}
		},
		setRangeSliderValue(state, action: PayloadAction<number[]>): void {
			state.rangeFilter.selectedPrices = action.payload;
			// console.log(state.rangeFilter.selectedPrices)
		},
		setMinSquare(state, action: PayloadAction<number>): void {
			state.estateFilter.minSquare = action.payload;
		},
		setEstateType(state, action: PayloadAction<string>): void {
			const i = state.estateFilter.estTypes.findIndex(item => item.value === action.payload);
			state.estateFilter.estTypes[`${i}`].checked = !state.estateFilter.estTypes[`${i}`].checked;
			// console.log(state.estateFilter.estTypes.map(item => ({ ...item })));
		},
		setRoomQuantity(state, action: PayloadAction<string>): void {			
			state.estateFilter.roomsQuantity.map((item, index) => {
				item.value === action.payload ? item.checked = true : item.checked = false
			})
			// console.log(state.estateFilter.roomsQuantity.map(item => ({ ...item })));
		},
		setFilterParams(state, action: PayloadAction<filterParam>):void {
			const {filter, type, name, value} = action.payload;
			switch (type) {
				case 'checkbox':
					const i = state[`${filter}`][`${name}`].findIndex(item => item.value === value);
					state[`${filter}`][`${name}`][i].checked = !state[`${filter}`][`${name}`][i].checked;
					break;
				case 'radio':
					// console.log('need to work this up');
					state[`${filter}`][`${name}`].map(item => {
						item.value === value ? item.checked = true : item.checked = false
					})
					break;
			}
		}
	},
	extraReducers: {},
});

export const FiltersReducer = FiltersSlice.reducer;
export const {setActiveFilter, setRangeSliderValue, setMinSquare, setEstateType, setRoomQuantity, setFilterParams} = FiltersSlice.actions;