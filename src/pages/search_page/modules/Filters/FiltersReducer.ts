import { createSlice, PayloadAction, createSelector } from "@reduxjs/toolkit";

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
	activeCategory: {
		all: true,
		estate: false,
		laptops: false,
		cameras: false,
		cars: false,
	},
	
	rangeFilter: {
		minPrice: 2,
		maxPrice: 200,
		selectedPrices: [2, 200],
	},

	prodCatFilter: {
		categories: [
			{ value: 'Все', forFilter: "all", checked: true, text: "Все", filter: 'prodCatFilter', subfilter: 'categories'},
			{ value: "Недвижимость", forFilter: "estateFilter", checked: false, text: "Недвижимость", filter: 'prodCatFilter', subfilter: 'categories'},
			{ value: 'Ноутбук', forFilter: "laptopFilter", checked: false, text: "Ноутбуки", filter: 'prodCatFilter', subfilter: 'categories'},
			{ value: 'Фотоаппарат', forFilter: "cameraFilter", checked: false, text: "Фотоаппараты", filter: 'prodCatFilter', subfilter: 'categories'},
			{ value: 'Автомобиль', forFilter: "carFilter", checked: false, text: "Автомобили", filter: 'prodCatFilter', subfilter: 'categories'},
		],		
	},
	cameraFilter: {
		cameraType: [
			{value: 'mirror', checked: false, text: 'Зеркальный', filter: 'cameraFilter', subfilter: 'cameraType'},
			{value: 'digital', checked: false, text: 'Цифровой', filter: 'cameraFilter', subfilter: 'cameraType'},
			{value: 'mirrorless', checked: false, text: 'Беззеркальный', filter: 'cameraFilter', subfilter: 'cameraType'},
		],
		resolutionMatrix: [
			{value: '1mp', checked: false, text: '1 МП', filter: 'cameraFilter', subfilter: 'resolutionMatrix'},
			{value: '3mp', checked: false, text: '3 МП', filter: 'cameraFilter', subfilter: 'resolutionMatrix'},
			{value: '5mp', checked: false, text: '5 МП', filter: 'cameraFilter', subfilter: 'resolutionMatrix'},
			{value: '7mp', checked: false, text: '7 МП', filter: 'cameraFilter', subfilter: 'resolutionMatrix'},
			{value: '10mp', checked: false, text: '10 МП', filter: 'cameraFilter', subfilter: 'resolutionMatrix'},
		],
		resolutionVideo: [
			{value: 'any', checked: false, text: 'Любое', filter: 'cameraFilter', subfilter: 'resolutionVideo'},
			{value: 'HD', checked: false, text: 'HD', filter: 'cameraFilter', subfilter: 'resolutionVideo'},
			{value: 'FullHD', checked: false, text: 'Full HD', filter: 'cameraFilter', subfilter: 'resolutionVideo'},
			{value: '4K', checked: false, text: '4K', filter: 'cameraFilter', subfilter: 'resolutionVideo'},
			{value: '5K', checked: false, text: '5K', filter: 'cameraFilter', subfilter: 'resolutionVideo'},
		],
	},
	carFilter: {
		minimalYear: [
			{value: '1900', checked: true, get text() {return this.value}, filter: 'carFilter', subfilter: 'minimalYear'},
			{value: '1940', checked: false, get text() {return this.value}, filter: 'carFilter', subfilter: 'minimalYear'},
			{value: '1960', checked: false, get text() {return this.value}, filter: 'carFilter', subfilter: 'minimalYear'},
			{value: '1980', checked: false, get text() {return this.value}, filter: 'carFilter', subfilter: 'minimalYear'},
			{value: '2000', checked: false, get text() {return this.value}, filter: 'carFilter', subfilter: 'minimalYear'},
		],
		transmission: [
			{value: 'any', checked: false, text: 'Любая', filter: 'carFilter', subfilter: 'transmission'},
			{value: 'mechanic', checked: false, text: 'Механика', filter: 'carFilter', subfilter: 'transmission'},
			{value: 'auto', checked: false, text: 'Автомат', filter: 'carFilter', subfilter: 'transmission'},
		],
		bodyType: [
			{value: 'sedan', checked: false, text: 'Седан', filter: 'carFilter', subfilter: 'bodyType'},
			{value: 'universal', checked: false, text: 'Универсал', filter: 'carFilter', subfilter: 'bodyType'},
			{value: 'hatchback', checked: false, text: 'Хэтчбэк', filter: 'carFilter', subfilter: 'bodyType'},
			{value: 'suv', checked: false, text: 'Внедорожник', filter: 'carFilter', subfilter: 'bodyType'},
			{value: 'cupe', checked: false, text: 'Купэ', filter: 'carFilter', subfilter: 'bodyType'},
		],
	},
	laptopFilter: {
		laptopType: [
			{ value: "ultra", checked: false, text: "Ультрабук", filter: 'laptopFilter', subfilter: 'laptopType'},
			{ value: "home", checked: false, text: "Домашний ноутбук", filter: 'laptopFilter', subfilter: 'laptopType'},
			{ value: "gaming", checked: false, text: "Игровой ноутбук", filter: 'laptopFilter', subfilter: 'laptopType'},
		],
		laptopRamValue: [
			{ value: "any", checked: true, text: "Любой", filter: 'laptopFilter', subfilter: 'laptopRamValue'},
			{ value: "4gb", checked: false, text: "4 Гб", filter: 'laptopFilter', subfilter: 'laptopRamValue'},
			{ value: "8gb", checked: false, text: "8 Гб", filter: 'laptopFilter', subfilter: 'laptopRamValue'},
			{ value: "16gb", checked: false, text: "16 Гб", filter: 'laptopFilter', subfilter: 'laptopRamValue'},
		],
		laptopDiagonal: [
			{ value: "any", checked: true, text: "Любая", filter: 'laptopFilter', subfilter: 'laptopDiagonal'},
			{ value: "13in", checked: false, text: "13″",  filter: 'laptopFilter', subfilter: 'laptopDiagonal'},
			{ value: "14in", checked: false, text: "14″", filter: 'laptopFilter', subfilter: 'laptopDiagonal'},
			{ value: "15in", checked: false, text: "15″", filter: 'laptopFilter', subfilter: 'laptopDiagonal'},
			{ value: "16in", checked: false, text: "17″", filter: 'laptopFilter', subfilter: 'laptopDiagonal'},
		],
		laptopProcType: [
			{ value: "i3", checked: false, text: "Intel Core i3", filter: 'laptopFilter', subfilter: 'laptopProcType'},
			{ value: "i5", checked: false, text: "Intel Core i5", filter: 'laptopFilter', subfilter: 'laptopProcType'},
			{ value: "i7", checked: false, text: "Intel Core i7", filter: 'laptopFilter', subfilter: 'laptopProcType'},
		],
	},
	estateFilter: {
		estateType: [
			{ value: "house", checked: false, text: "Дом", filter: 'estateFilter', subfilter: 'estateType'},
			{ value: "flat", checked: false, text: "Квартира", filter: 'estateFilter', subfilter: 'estateType'},
			{ value: "apartments", checked: false, text: "Апартаменты", filter: 'estateFilter', subfilter: 'estateType'},
		],
		minSquare: [
			{value: '', checked: true, filter: 'estateFilter', subfilter: 'minSquare'}
		],
		roomsQuantity: [
			{ value: "any", checked: false, text: "Любое", filter: 'estateFilter', subfilter: 'roomsQuantity'},
			{ value: "one", checked: false, text: "1", filter: 'estateFilter', subfilter: 'roomsQuantity'},
			{ value: "two", checked: false, text: "2", filter: 'estateFilter', subfilter: 'roomsQuantity'},
			{ value: "three", checked: false, text: "3", filter: 'estateFilter', subfilter: 'roomsQuantity'},
			{ value: "four", checked: false, text: "4", filter: 'estateFilter', subfilter: 'roomsQuantity'},
			{ value: "fivemore", checked: false, text: "5+", filter: 'estateFilter', subfilter: 'roomsQuantity'},
		],
	},	
};

const FiltersSlice = createSlice({
	name: "FiltersSlice",
	initialState,
	reducers: {
		setActiveCategory(state, action: PayloadAction<string>): void {
			for (let key in state.activeCategory) {
				if (key === action.payload) state.activeCategory[`${key}`] = true;
				else state.activeCategory[`${key}`] = false;
			}
			state.prodCatFilter.categories.map((cat) => {
				cat.value === action.payload ? (cat.checked = true) : (cat.checked = false);
			});
		},
		setRangeSliderValue(state, action: PayloadAction<number[]>): void {
			state.rangeFilter.selectedPrices = action.payload;
			// console.log(state.rangeFilter.selectedPrices)
		},
		setMinSquare(state, action: PayloadAction<number>): void {
			console.log(String(action.payload));
			state.estateFilter.minSquare[0].value = String(action.payload);
		},
		setUlParams(state, action: PayloadAction<filterParams>): void {
			const { type, filter, subfilter, value } = action.payload;
			const path = state[`${filter}`][`${subfilter}`];
			// console.log('setUlParams incoming data: ' + type, filter, subfilter, value);
			switch (type) {							
				case "checkbox":
					const index = path.findIndex((item) => item.value === value);
					const item = path[index];
					item.checked = !item.checked;
					break;
				case "radio":
					path.map((item) => {
						item.value === value ? (item.checked = true) : (item.checked = false);
					});
					break;
			}
		},
		setSelectParams(state, action: PayloadAction<selectParams>): void {
			const { filter, subfilter, value } = action.payload;
			const path = state[`${filter}`][`${subfilter}`];
			path.map((item) => {
				item.value === value ? (item.checked = true) : (item.checked = false);
			});
		}
	},
	extraReducers: {},
});

export const FiltersReducer = FiltersSlice.reducer;
export const { setActiveCategory, setRangeSliderValue, setMinSquare, setUlParams, setSelectParams } =
	FiltersSlice.actions;

export function getActiveCategory(prodCatFilter) {
	const selectedCtg = prodCatFilter['categories'].findIndex((item) => item.checked === true);
	const forFilter = prodCatFilter['categories'][selectedCtg].forFilter;
	const value = prodCatFilter['categories'][selectedCtg].value;
	return [forFilter, value]
};

export const getCheckedFilters = createSelector(
	(state) => state.FiltersReducer.prodCatFilter,
	(state) => state.FiltersReducer.cameraFilter,
	(state) => state.FiltersReducer.carFilter,
	(state) => state.FiltersReducer.laptopFilter,
	(state) => state.FiltersReducer.estateFilter,
   (prodCatFilter, cameraFilter, carFilter, laptopFilter, estateFilter) => {
		const filters = {prodCatFilter, cameraFilter, carFilter, laptopFilter, estateFilter}
		let chosenFilters;
		let checkedItems = [];

		console.log('Начало работы');
		const activeFilter = getActiveCategory(prodCatFilter);
		console.log('activeFilter: ', activeFilter);
		checkedItems.push({category: activeFilter[1]})
				
		if (activeFilter[0] === 'all') {
			chosenFilters = filters;
			Object.values(chosenFilters).forEach((filter: Record<string, any>) => {
				for (let index in filter) {					
					filter[index].forEach(item => {
						if (item.checked === true) checkedItems.push(item)
					})
				}
			});
		} else {
			chosenFilters = filters[activeFilter[0]]
			Object.values(chosenFilters).forEach((filter: Record<string, any>) => {
				for (let index in filter) {
					if (filter[index].checked === true) checkedItems.push(filter[index])					
				}
			});
		}
		console.log('checkedItems в итоге:', checkedItems);

		// далее здесь нужно обработать rangeSlider
		// итоговый результат упаковать в (подумать) и вернуть из функции
		// затем оно будет использовано для поиска по базе данных

		return checkedItems
	}
)

// export const getCheckedFilters2 = createSelector(
// 	state => state.FiltersReducer,
// 	filters => {
// 		// console.log(filters);
// 		//   Создаем массив из всех фильтров с checked: true
// 	  let checkedFilters = [];
	
// 	  // Функция для добавления фильтров с checked: true в массив
// 	  const addCheckedFilters = (filter) => {
// 		 for (const key in filter) {
// 			if (filter.hasOwnProperty(key) && filter[key].checked) {
// 			  checkedFilters.push(filter[key]);
// 			}
// 		 }
// 	  };
 
// 	  // Получаем все фильтры из состояния и вызываем addCheckedFilters для каждого
// 	  Object.values(filters).forEach(filter => {
// 		 addCheckedFilters(filter);
// 	  });
 
// 	  return checkedFilters;
// 	}
//  );