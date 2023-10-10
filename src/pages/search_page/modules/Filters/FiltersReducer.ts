import { createSlice, PayloadAction, createSelector } from "@reduxjs/toolkit";

import { dbKeysAdapter, dbValuesAdapter } from "./utils";
// import { inputs_data } from './inputsData.js'

interface FiltersState {
	activeCategory: {
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
	priceFilter: {
		minPrice: 2,
		maxPrice: 200,
		selectedPrices: [2, 200],
	},
	prodCatFilter: {
		categories: [
			{ value: 'Все', forFilter: "all", checked: false, text: "Все", filter: 'prodCatFilter', subfilter: 'categories'},
			{ value: "Недвижимость", forFilter: "estateFilter", checked: false, text: "Недвижимость", filter: 'prodCatFilter', subfilter: 'categories'},
			{ value: 'Ноутбук', forFilter: "laptopFilter", checked: false, text: "Ноутбуки", filter: 'prodCatFilter', subfilter: 'categories'},
			{ value: 'Фотоаппарат', forFilter: "cameraFilter", checked: false, text: "Фотоаппараты", filter: 'prodCatFilter', subfilter: 'categories'},
			{ value: 'Автомобиль', forFilter: "carFilter", checked: true, text: "Автомобили", filter: 'prodCatFilter', subfilter: 'categories'},
		],		
	},
	cameraFilter: {
		cameraType: [
			{value: 'mirror', checked: false, text: 'Зеркальный', category: "Фотоаппарат", filter: 'cameraFilter', subfilter: 'cameraType'},
			{value: 'digital', checked: false, text: 'Цифровой', category: "Фотоаппарат", filter: 'cameraFilter', subfilter: 'cameraType'},
			{value: 'mirrorless', checked: false, text: 'Беззеркальный', category: "Фотоаппарат", filter: 'cameraFilter', subfilter: 'cameraType'},
		],
		resolutionMatrix: [
			{value: '1', checked: false, text: '1 МП', category: "Фотоаппарат", filter: 'cameraFilter', subfilter: 'resolutionMatrix'},
			{value: '3', checked: false, text: '3 МП', category: "Фотоаппарат", filter: 'cameraFilter', subfilter: 'resolutionMatrix'},
			{value: '5', checked: false, text: '5 МП', category: "Фотоаппарат", filter: 'cameraFilter', subfilter: 'resolutionMatrix'},
			{value: '7', checked: false, text: '7 МП', category: "Фотоаппарат", filter: 'cameraFilter', subfilter: 'resolutionMatrix'},
			{value: '10', checked: false, text: '10 МП', category: "Фотоаппарат", filter: 'cameraFilter', subfilter: 'resolutionMatrix'},
		],
		resolutionVideo: [
			{value: '', checked: false, text: 'Любое', category: "Фотоаппарат", filter: 'cameraFilter', subfilter: 'resolutionVideo'},
			{value: 'HD', checked: false, text: 'HD', category: "Фотоаппарат", filter: 'cameraFilter', subfilter: 'resolutionVideo'},
			{value: 'FullHD', checked: false, text: 'Full HD', category: "Фотоаппарат", filter: 'cameraFilter', subfilter: 'resolutionVideo'},
			{value: '4K', checked: false, text: '4K', category: "Фотоаппарат", filter: 'cameraFilter', subfilter: 'resolutionVideo'},
			{value: '5K', checked: false, text: '5K', category: "Фотоаппарат", filter: 'cameraFilter', subfilter: 'resolutionVideo'},
		],
	},
	carFilter: {
		minimalYear: [
			{value: '1900', checked: false, get text() {return this.value}, category: "Автомобиль", filter: 'carFilter', subfilter: 'minimalYear'},
			{value: '1940', checked: false, get text() {return this.value}, category: "Автомобиль", filter: 'carFilter', subfilter: 'minimalYear'},
			{value: '1960', checked: false, get text() {return this.value}, category: "Автомобиль", filter: 'carFilter', subfilter: 'minimalYear'},
			{value: '1980', checked: false, get text() {return this.value}, category: "Автомобиль", filter: 'carFilter', subfilter: 'minimalYear'},
			{value: '2000', checked: true, get text() {return this.value}, category: "Автомобиль", filter: 'carFilter', subfilter: 'minimalYear'},
		],
		transmission: [
			{value: '', checked: false, text: 'Любая', category: "Автомобиль", filter: 'carFilter', subfilter: 'transmission'},
			{value: 'mechanic', checked: false, text: 'Механика', category: "Автомобиль", filter: 'carFilter', subfilter: 'transmission'},
			{value: 'auto', checked: false, text: 'Автомат', category: "Автомобиль", filter: 'carFilter', subfilter: 'transmission'},
		],
		bodyType: [
			{value: 'sedan', checked: false, text: 'Седан', category: "Автомобиль", filter: 'carFilter', subfilter: 'bodyType'},
			{value: 'universal', checked: false, text: 'Универсал', category: "Автомобиль", filter: 'carFilter', subfilter: 'bodyType'},
			{value: 'hatchback', checked: false, text: 'Хэтчбэк', category: "Автомобиль", filter: 'carFilter', subfilter: 'bodyType'},
			{value: 'suv', checked: false, text: 'Внедорожник', category: "Автомобиль", filter: 'carFilter', subfilter: 'bodyType'},
			{value: 'cupe', checked: false, text: 'Купэ', category: "Автомобиль", filter: 'carFilter', subfilter: 'bodyType'},
		],
	},
	laptopFilter: {
		laptopType: [
			{ value: "ultra", checked: false, text: "Ультрабук", category: "Ноутбук", filter: 'laptopFilter', subfilter: 'laptopType'},
			{ value: "home", checked: false, text: "Домашний ноутбук", category: "Ноутбук", filter: 'laptopFilter', subfilter: 'laptopType'},
			{ value: "gaming", checked: false, text: "Игровой ноутбук", category: "Ноутбук", filter: 'laptopFilter', subfilter: 'laptopType'},
		],
		laptopRamValue: [
			{ value: "", checked: true, text: "Любой", category: "Ноутбук", filter: 'laptopFilter', subfilter: 'laptopRamValue'},
			{ value: "4", checked: false, text: "4 Гб", category: "Ноутбук", filter: 'laptopFilter', subfilter: 'laptopRamValue'},
			{ value: "8", checked: false, text: "8 Гб", category: "Ноутбук", filter: 'laptopFilter', subfilter: 'laptopRamValue'},
			{ value: "16", checked: false, text: "16 Гб", category: "Ноутбук", filter: 'laptopFilter', subfilter: 'laptopRamValue'},
		],
		laptopDiagonal: [
			{ value: "", checked: true, text: "Любая", category: "Ноутбук", filter: 'laptopFilter', subfilter: 'laptopDiagonal'},
			{ value: "13", checked: false, text: "13″",  category: "Ноутбук", filter: 'laptopFilter', subfilter: 'laptopDiagonal'},
			{ value: "14", checked: false, text: "14″", category: "Ноутбук", filter: 'laptopFilter', subfilter: 'laptopDiagonal'},
			{ value: "15", checked: false, text: "15″", category: "Ноутбук", filter: 'laptopFilter', subfilter: 'laptopDiagonal'},
			{ value: "16", checked: false, text: "17″", category: "Ноутбук", filter: 'laptopFilter', subfilter: 'laptopDiagonal'},
		],
		laptopProcType: [
			{ value: "i3", checked: false, text: "Intel Core i3", category: "Ноутбук", filter: 'laptopFilter', subfilter: 'laptopProcType'},
			{ value: "i5", checked: false, text: "Intel Core i5", category: "Ноутбук", filter: 'laptopFilter', subfilter: 'laptopProcType'},
			{ value: "i7", checked: false, text: "Intel Core i7", category: "Ноутбук", filter: 'laptopFilter', subfilter: 'laptopProcType'},
		],
	},
	estateFilter: {
		estateType: [
			{ value: "house", checked: true, text: "Дом", category: "Недвижимость", filter: 'estateFilter', subfilter: 'estateType'},
			{ value: "flat", checked: true, text: "Квартира", category: "Недвижимость", filter: 'estateFilter', subfilter: 'estateType'},
			{ value: "apartment", checked: true, text: "Апартаменты", category: "Недвижимость", filter: 'estateFilter', subfilter: 'estateType'},
		],
		minSquare: [
			{value: '', checked: true, category: "Недвижимость", filter: 'estateFilter', subfilter: 'minSquare'}
		],
		roomsQuantity: [
			{ value: "", checked: false, text: "Любое", category: "Недвижимость", filter: 'estateFilter', subfilter: 'roomsQuantity'},
			{ value: "1", checked: false, text: "1", category: "Недвижимость", filter: 'estateFilter', subfilter: 'roomsQuantity'},
			{ value: "2", checked: false, text: "2", category: "Недвижимость", filter: 'estateFilter', subfilter: 'roomsQuantity'},
			{ value: "3", checked: false, text: "3", category: "Недвижимость", filter: 'estateFilter', subfilter: 'roomsQuantity'},
			{ value: "4", checked: false, text: "4", category: "Недвижимость", filter: 'estateFilter', subfilter: 'roomsQuantity'},
			{ value: "5+", checked: false, text: "5+", category: "Недвижимость", filter: 'estateFilter', subfilter: 'roomsQuantity'},
		],
	},	
};

const FiltersSlice = createSlice({
	name: "FiltersSlice",
	initialState,
	reducers: {
		setActiveCategory(state, action: PayloadAction<string>): void {			
			state.prodCatFilter.categories.map((cat) => {
				cat.value === action.payload ? (cat.checked = true) : (cat.checked = false);
			});
		},
		setRangeSliderValue(state, action: PayloadAction<number[]>): void {
			state.priceFilter.selectedPrices = action.payload;
			// console.log(state.rangeFilter.selectedPrices)
		},
		setMinSquare(state, action: PayloadAction<number>): void {
			// console.log(String(action.payload));
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
	const value = prodCatFilter['categories'][selectedCtg].value;
	return value
};

export const getCheckedFilters = createSelector(
	(state) => ({ ...state.FiltersReducer }),
	({ priceFilter, prodCatFilter, cameraFilter, carFilter, laptopFilter, estateFilter }) => {
		// console.log('Начало работы селектора getCheckedFilters');
		// 1. Определяем интересующие нас фильтры и узнаём активную категорию
		const filters = {prodCatFilter, cameraFilter, carFilter, laptopFilter, estateFilter}
		const activeCategory = getActiveCategory(prodCatFilter);
		// console.log('activeCategory: ', activeCategory);
		// checkedItems.push({category: activeCategory[1]})
		
		// 2. Проходимся по всему стейту и выбираем только выбранные записи (в которых checked = true).
		let checkedItems = [];
		// 2.1 Если выбрана категория "Все", то записей никаких не будет, поэтому берём только цены
		if (activeCategory === 'Все') {
			let result = {
				category: "Все",
				selectedPrices: priceFilter.selectedPrices,
			}
			console.log('result с активным фильтром "Все"', result);
			return result
		} 
		// 2.2 Если не "Все", то вычисляем активный фильтр в стейте и выбираем итемы с checked = true из него 
		else {
			const forFilter = prodCatFilter['categories'].find((item) => item.value === activeCategory).forFilter;
			const chosenFilter = filters[forFilter]
			Object.values(chosenFilter).forEach((filter: Record<string, any>) => {
				for (let index in filter) {
					const item = filter[index];
					if (item.checked === true) checkedItems.push(item)
				}
			});
		}
		// console.log('checkedItems:', checkedItems);

		// 3. Преобразовываем выбранные пользователем элементы фильтров в более удобный для фильтрации вид
		// filtersData в итоге будет заполнена выбранными элементами и передана дальше для фильтрации с её помощью
		// если элемент не выбран пользователем, то он имеет значение пустой строки ''
		let filtersData = [
			{category: "Недвижимость", price: [], estateType: [], minSquare: '', roomsQuantity: '' },
			{category: "Ноутбук", price: [], laptopType: [], laptopRamValue: '', laptopDiagonal: '', laptopProcType: [] },
			{category: "Фотоаппарат", price: [], cameraType: [], resolutionMatrix: '', resolutionVideo: '' },
			{category: "Автомобиль", price: [], bodyType: [], minimalYear: '', transmission: '' }
		];		
		
		// 4. Все value выбранных объектов checkedItems, относящиеся к чекбоксам, 
		// перепаковываются в массивы в соотв. категории filtersData (например estateType)
		const checkboxes = ['estateType', 'laptopType', 'laptopProcType', 'cameraType', 'bodyType']
		checkedItems.forEach(item => {
			if (checkboxes.includes(item.subfilter)) {				
				filtersData.forEach(obj => {
					if(obj.category === item.category) {
						obj[item.subfilter].push(item.value)
					} 
				})
			} 
			else {
				// 5. Заполняются остальные свойства объекта filtersData (кроме prices, его добавим ниже)
				filtersData.forEach(elem => {
					if(elem.category === item.category) {
						elem[item.subfilter] = item.value;
					}
				})
			}			
		})

		// 6. выбираем в result только тот элемент filtersData, чья категория сейчас активна. 
		// result - это объект
		let result = filtersData.filter(obj => obj.category === activeCategory)[0]
		
		// 7. добавляем выбранные цены в result
		result.price = priceFilter.selectedPrices;

		// 8. Переводим названия свойств объекта на "язык" базы данных
		// Создаем новый объект, переименовывая ключи на основе dbKeysAdapter
		const renamedResult = {};
		for (const key in result) {			
			const adaptedKey = dbKeysAdapter('toDB', key);
			renamedResult[adaptedKey] = result[key];
		}
		// console.log('renamedResult', renamedResult);
		
		// dbValuesAdapter(renamedResult)
		// 9. Всё готово, возвращаем renamedResult;
		// console.log('filtersData:', filtersData);
		// console.log('result', result);
		return renamedResult
	}
)