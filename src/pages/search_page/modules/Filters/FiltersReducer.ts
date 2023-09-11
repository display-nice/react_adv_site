import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FiltersState {
	activeFilter: {
		all: boolean;
		estate: boolean;
		laptops: boolean;
		camera: boolean;
		cars: boolean;
	};
	cameraFilter: {
		cameraType: string; // possible values (string): mirror, digital, mirrorless
		resolutionMatrix: string; // possible values (string): 1mp, 3mp, 5mp, 7mp, 10mp
		resolutionVideo: string; // possible values (string): any, HD, Full HD, 4k, 5k
	};
	carFilter: {
		minimalYear: string; // possible values (string): 1900, 1940, 1960, 1980, 2000
		transmission: string; // possible values (string): any, mechanical, auto
		bodyType: string; // possible values (string): sedan, universal, hatchback, jeep, cupe
	};
	laptopFilter: {
		laptopType: string; // possible values (string): ultra, home, gaming
		ramValue: string; // possible values (string): any, 4gb, 8gb, 16gb
		screenDiagonal: number; // possible values (number): 13, 14, 15, 17
		processorType: string; // possible values (string): i3, i5, i7
	};
	estateFilter: {
		estateType: string; // possible values (string): house, flat, apartments
		minSquare: number; // possible values (number): any number
		roomsQuantity: string; // possible values (string): any, 1, 2, 3, 4, 5+
	};
	rangeFilter: {
		minPrice: number;
		maxPrice: number;
		prices: number[];
	};
}

type filterParams = {
	type: string;
	filter: string;
	subfilter: string;
	value: string;
	checked?: boolean;
};

type selectParams = {
	filter: string;
	subfilter: string;
	value: string;
	checked?: boolean;
}

const initialState = {
	productCategoryFilter: {
		categories: [
			{ name: "productCategories", text: "Все", value: "all", checked: true },
			{ name: "productCategories", text: "Недвижимость", value: "estate", checked: false },
			{ name: "productCategories", text: "Ноутбуки", value: "laptops", checked: false },
			{ name: "productCategories", text: "Фотоаппараты", value: "cameras", checked: false },
			{ name: "productCategories", text: "Автомобили", value: "cars", checked: false },
		],
		activeCategory: {
			all: true,
			estate: false,
			laptops: false,
			cameras: false,
			cars: false,
		},
	},
	cameraFilter: {
		cameraType: [
			{value: 'mirror', checked: false, text: 'Зеркальный'},
			{value: 'digital', checked: false, text: 'Цифровой'},
			{value: 'mirrorless', checked: false, text: 'Беззеркальный'},
		],
		resolutionMatrix: [
			{value: '1mp', checked: false, text: '1 МП'},
			{value: '3mp', checked: false, text: '3 МП'},
			{value: '5mp', checked: false, text: '5 МП'},
			{value: '7mp', checked: false, text: '7 МП'},
			{value: '10mp', checked: false, text: '10 МП'},
		],
		resolutionVideo: [
			{value: 'any', checked: false, text: 'Любое'},
			{value: 'HD', checked: false, text: 'HD'},
			{value: 'FullHD', checked: false, text: 'Full HD'},
			{value: '4K', checked: false, text: '4K'},
			{value: '5K', checked: false, text: '5K'},
		],
	},
	carFilter: {
		minimalYear: [
			{value: '1900', checked: true, get text() {return this.value}},
			{value: '1940', checked: false, get text() {return this.value}},
			{value: '1960', checked: false, get text() {return this.value}},
			{value: '1980', checked: false, get text() {return this.value}},
			{value: '2000', checked: false, get text() {return this.value}},
		],
		transmission: [
			{value: 'any', checked: false, text: 'Любая'},
			{value: 'mechanical', checked: false, text: 'Механика'},
			{value: 'auto', checked: false, text: 'Автомат'},
		],
		bodyType: [
			{value: 'sedan', checked: false, text: 'Седан'},
			{value: 'universal', checked: false, text: 'Универсал'},
			{value: 'hatchback', checked: false, text: 'Хэтчбэк'},
			{value: 'jeep', checked: false, text: 'Внедорожник'},
			{value: 'cupe', checked: false, text: 'Купэ'},
		],
	},
	laptopFilter: {
		laptopType: [
			{ value: "ultra", checked: false, text: "Ультрабук", },
			{ value: "home", checked: false, text: "Домашний ноутбук", },
			{ value: "gaming", checked: false, text: "Игровой ноутбук", },
		],
		laptopRamValue: [
			{ value: "any", checked: true, text: "Любой", },
			{ value: "4gb", checked: false, text: "4 Гб", },
			{ value: "8gb", checked: false, text: "8 Гб", },
			{ value: "16gb", checked: false, text: "16 Гб", },
		],
		laptopDiagonal: [
			{ value: "any", checked: true, text: "Любая", },
			{ value: "13in", checked: false, text: "13″",  },
			{ value: "14in", checked: false, text: "14″", },
			{ value: "15in", checked: false, text: "15″", },
			{ value: "16in", checked: false, text: "17″", },
		],
		laptopProcType: [
			{ value: "i3", checked: false, text: "Intel Core i3", },
			{ value: "i5", checked: false, text: "Intel Core i5", },
			{ value: "i7", checked: false, text: "Intel Core i7", },
		],
	},
	estateFilter: {
		estateType: [
			{ value: "house", checked: false, text: "Дом", },
			{ value: "flat", checked: false, text: "Квартира", },
			{ value: "apartments", checked: false, text: "Апартаменты", },
		],
		minSquare: 0,
		roomsQuantity: [
			{ value: "any", checked: false, text: "Любое", },
			{ value: "one", checked: false, text: "1", },
			{ value: "two", checked: false, text: "2", },
			{ value: "three", checked: false, text: "3", },
			{ value: "four", checked: false, text: "4", },
			{ value: "fivemore", checked: false, text: "5+", },
		],
	},
	rangeFilter: {
		minPrice: 2,
		maxPrice: 200,
		selectedPrices: [2, 200],
	},
};

const FiltersSlice = createSlice({
	name: "FiltersSlice",
	initialState,
	reducers: {
		setActiveCategory(state, action: PayloadAction<string>): void {
			for (let key in state.productCategoryFilter.activeCategory) {
				if (key === action.payload) state.productCategoryFilter.activeCategory[`${key}`] = true;
				else state.productCategoryFilter.activeCategory[`${key}`] = false;
			}
			state.productCategoryFilter.categories.map((cat) => {
				cat.value === action.payload ? (cat.checked = true) : (cat.checked = false);
			});
		},
		setRangeSliderValue(state, action: PayloadAction<number[]>): void {
			state.rangeFilter.selectedPrices = action.payload;
			// console.log(state.rangeFilter.selectedPrices)
		},
		setMinSquare(state, action: PayloadAction<number>): void {
			state.estateFilter.minSquare = action.payload;
		},
		setUlParams(state, action: PayloadAction<filterParams>): void {
			const { type, filter, subfilter, value } = action.payload;
			// console.log('setUlParams incoming data: ' + type, filter, subfilter, value);
			switch (type) {							
				case "checkbox":
					const i = state[`${filter}`][`${subfilter}`].findIndex((item) => item.value === value);
					state[`${filter}`][`${subfilter}`][i].checked = !state[`${filter}`][`${subfilter}`][i].checked;
					break;
				case "radio":
					state[`${filter}`][`${subfilter}`].map((item) => {
						item.value === value ? (item.checked = true) : (item.checked = false);
					});
					break;
			}
		},
		setSelectParams(state, action: PayloadAction<selectParams>): void {
			const { filter, subfilter, value } = action.payload;			
			state[`${filter}`][`${subfilter}`].map((item) => {
				item.value === value ? (item.checked = true) : (item.checked = false);
			});
		}
	},
	extraReducers: {},
});

export const FiltersReducer = FiltersSlice.reducer;
export const { setActiveCategory, setRangeSliderValue, setMinSquare, setUlParams, setSelectParams } =
	FiltersSlice.actions;
